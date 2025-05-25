 

import React, { useEffect, useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Navbar from '../components/Navbar';
import Travelstorcard from '../components/Travelstorcard';
import { ToastContainer, toast } from 'react-toastify';
import Modal from "react-modal"
import {MdAdd} from 'react-icons/md' 
import AddEditTravelStory from './AddEditTravelStory'
import ViewTravelStory from '../components/ViewTravelStory' 
import EmptyCard from '../../cards/EmptyCard';
import  imgsrc from '../assets/images/icons8-storytelling-50.png'
import { DayPicker } from "react-day-picker";
import moment from 'moment';
import "react-day-picker/dist/style.css"; // Ensure styles are included
import FilterInfoTitle from '../../cards/FilterInfoTitle'

export const Profile = () => {
  const [userinfo, setUserinfo] = useState(null);
  const [alluser , SetAlluser] = useState([]) ;
 const [openeditmodel  , setEditModel] = useState({isShown:false , data:null , type:"add" });
// this is for search bar to search story accn to need .
 const [searchQuery , setSearchQuery] = useState("");
 const [filterType , setFilterType] = useState('');
 const [openViewModal , setOpenViewModal] = useState({
  isShown : false  , data:null 
 })

// this date range is searching the story in particular range :

const [dateRange, setDateRange] = useState({ from: null, to: null });
  const navigate = useNavigate();


  // this routes are generally taking data from backend and showing on frontend this routes are not taking any input 
  // the data we already manually  created in backend for testing postman api 

  const getUserInfo = async () => {
    try {
      console.log("Fetching User Info...");

      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No Token Found");
        navigate("/login");
        return;
      }

      console.log("Token from Local Storage:", token);

      const response = await axios.get('http://localhost:3000/api/users/get-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Full Response:", response);

      if (response.data) {
        setUserinfo(response.data); // Storing User Data in State
        console.log("User Info Found ✅:", response.data);
      } else {
        console.log("No User Data Found ❌");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized! Redirecting...");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

    // this routes are generally taking data from backend and showing on frontend this routes are not taking any input 
   // the data we already manually  created in backend for testing postman api 

  const getAllUserInfo = async () =>{
    try {
      console.log("ALL User Info...");

      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No Token Found");
        // navigate("/login");
        return;
      }

      console.log("Token from Local Storage:", token);

      const response = await axios.get('http://localhost:3000/api/users/getalltravelstory', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Full All user  Response:", response);

      if (response.data && response.data.story && response.data.story.length > 0) {
        SetAlluser(response.data.story);
        console.log("Found ALL USERS INFO:", response.data.story);
      }
      
      
    else {
        console.log("No User Data Found ❌");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized! Redirecting...");
        localStorage.clear();
        navigate("/login");
      }
    }
  }
 
  
  
// this liking the story 
  const updateisFavourite = async (storyData) => {
    const storyId = storyData._id;
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/update-isFavorite/${storyId}`,
        {
          isFavorite: !storyData.isFavorite,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token here
          },
        }
      );
  
      if (response.data && response.data.story) {
        toast.success("story updated succesfully !")
        getAllUserInfo();
        console.log("Favourite Updated:", response.data.story);
      }
    } catch (error) {
      console.error("Error updating favourite:", error);
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized! Redirecting...");
        localStorage.clear();
        navigate("/login");
      }
    }
  };
  


  useEffect(() => {
    
    getUserInfo();
    getAllUserInfo();

  } , [] );


  // this routes is updating travel card when we had taken input from user and posted that card if we need to update it we can 
  // handle edit story :
  const handleEdit = (data) =>{
    setEditModel({ isShown: true, data: data, type: "edit" });
  }
  
  // when we click on travel card we will see whole card  .

  const handleViewStory = (data) =>{
    setOpenViewModal({isShown:true , data});
  }
 
  // Clicking on delete story button to delete whole story .

  const deleteViewStory = async(storyId) => {

    try
    {
      let token = localStorage.getItem("token");
      if(!token)
      {
        console.log("token not found ! ")
        return ;
      }   
         await axios.delete(`http://localhost:3000/api/users/delete/${storyId}` , {
         headers : {
           Authorization : ` Bearer ${token}`
         },

      });
          toast.success("Story Deleted Successfully ");
          // Remove the deleted story from the state
    SetAlluser((prevStories) => prevStories.filter((story) => story._id !== storyId));

      // when deleting close the view mode of story 
      setOpenViewModal({ isShown: false , data: null  });

    } catch(error)
    {
      toast.error("Error Deleting Story ") ;
      console.log("Something went wrong to delete story " , error);
    }
    
  }


const onSearchStory = async () => {
  try {
    let token = localStorage.getItem("token"); 

    const response = await axios.get('http://localhost:3000/api/users/search', {

      headers: {
        Authorization: `Bearer ${token}`,
      },

      params: {
        query: searchQuery, // Use searchQuery state variable
      }

    });

    if (response.data && response.data.story) {
      setFilterType("search");
      SetAlluser(response.data.story);
    }
  } catch (error) {
    console.error("Error searching the story info:", error);
  }
};


const handleClearSearch = () =>{
  setFilterType("");
  getAllUserInfo();
}


// handle filter travel 

const filterStoriesByDate = async (day) =>{
  try
  {
    let token = localStorage.getItem("token"); 
  const startDate = day.from ? moment(day.from).valueOf() : null ;
  const endDate = day.to ? moment(day.to).valueOf() :null ;
  
  if(startDate && endDate)
  {
    const response = await axios.get('http://localhost:3000/api/users/filterbydate' , 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // this are the parameters that we have give in postman for searching the stories by date
         params:{ startDate , endDate} ,
  }) ;
  if (response.data && response.data.story) {
    setFilterType("date");
    SetAlluser(response.data.story);
  }
  }
  }
  catch (error) {
    console.error("Error searching the story info:", error);
  }
}

// this searching story by calender 
// handle date range select 
const handleDayClick = (range) => {
  setDateRange(range);  // Correctly updates the state with {from, to}
  filterStoriesByDate(range);
};

// when reseting all the stories not in range will be reset and all are visible 
const resetFilter = () =>{
  setDateRange({from:null , to:null });
  setFilterType("");
  getAllUserInfo();
}

  return (
    <div>
      {/* Navbar component */}
      {/* we are adding search elemeent for searching the story  */}
      <Navbar getUserInfo={userinfo} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchNote={onSearchStory} handleClearSearch={handleClearSearch}/>
       
   {/* this thing will give us the range we selected in calender at the top of stories */}

   <div className='container mx-auto  pt-10 flex items-center justify-center mt-10  '>
    <FilterInfoTitle
    
    filterType = {filterType} 
    filterDates = {dateRange}
    onClear={()=>{
        resetFilter() ;
    }}
    
    />

   </div>

   <h1 className='text-2xl font-bold justify-center items-center flex '>My Stories  </h1>
   
       <div className='flex flex-col md:flex-row justify-between   p-1'>
         {/* here are adding a calender in which we can search our story in particular range :  */}
       

<div className='w-[320px] m-8' >
<div className='bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg'>
<div className='p-1'>
<DayPicker
  captionLayout="dropdown-buttons"
  mode="range"
  selected={dateRange}
  onSelect={handleDayClick}
  pagedNavigation
 
/>

</div>
  
</div>
</div>

 
      <div className='container mx-auto py-10'>
        <div className='flex gap-7'>

        {alluser.length > 0 ? (
  <div className='grid grid-cols-1 ml-5 md:grid-cols-2 gap-6'> 
    {/* Display stories in reverse order (latest first) */}
    {alluser.slice().reverse().map((item) => (
      <Travelstorcard
        key={item._id}
        imageUrl={item.imageUrl}
        title={item.title}
        visitedLocation={item.visitedLocation}
        date={item.visitedDate}
        story={item.story}
        isFavorite={item.isFavorite}
        onClick={() => handleViewStory(item)}
        onFavouriteClick={() => updateisFavourite(item)}
      />
    ))}
  </div>
) : (
  <EmptyCard 
    imgSrc={imgsrc} 
    message='Start creating your first Travel Story! Click on the "+" button to jot down your thoughts, ideas, and memories. Let’s Go!'
  />
)}

      </div>
</div>





 
{/* ADD AND EDIT TRAVEL STORY MODAL  */}
{/* In React, a modal is a UI component that appears as an overlay on top of the main content,
 typically used for displaying important information, forms, or confirmation dialogs. 
 It is often implemented using built-in React features (like state management) or UI libraries. */}
{/* edit and add travel story modal */}
{/* this is generally used when you click on + button one screen page will apper of addedittravelsotry */}
<Modal
  isOpen={openeditmodel.isShown}
  onRequestClose={() => {
    setEditModel({ isShown: false, data: null, type: "add" });
  }}
  onAfterOpen={() => {
    const root = document.getElementById("root");
    root.style.overflow = "hidden"; // Disable background scroll
  }}
  onAfterClose={() => {
    const root = document.getElementById("root");
    root.style.overflow = "auto"; // Enable background scroll again
  }}
  style={{
    overlay: {
      background: "rgba(0 , 0 , 0 , 0.2)",
      zIndex: 999,
    },
  }}
  appElement={document.getElementById("root")}
  className="model-box w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 z-50"
>
  <div className="max-h-[70vh] overflow-y-auto">
    <AddEditTravelStory
      type={openeditmodel.type}
      storyInfo={openeditmodel.data}
      onClose={() => {
        setEditModel({ isShown: false, data: null, type: "add" });
      }}
      getAllUserInfo={getAllUserInfo}
    />
  </div>
</Modal>


{/* VIEW TRAVEL STORY MODEL  */}
  
{/* // when we click on travel card we will see whole card  . */}
<Modal
  isOpen={openViewModal.isShown}
  onRequestClose={() => {
    // setEditModel({ isShown: false, data: null, type: "add" });
  }}
  onAfterOpen={() => {
    const root = document.getElementById("root");
    root.style.overflow = "hidden"; // Disable background scroll
  }}
  onAfterClose={() => {
    const root = document.getElementById("root");
    root.style.overflow = "auto"; // Enable background scroll again
  }}
  style={{
    overlay: {
      background: "rgba(0 , 0 , 0 , 0.2)",
      zIndex: 999,
    },
  }}
  appElement={document.getElementById("root")}
  className="model-box w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 z-50"
>

{/* to view the entire card :  different component */}
{/* when we click on card onclick we will view the entire card  */}
<ViewTravelStory 
  storyInfo={openViewModal.data || {}}  // Instead of null, pass an empty object
  handleDeleteView={() => deleteViewStory(openViewModal.data?._id)}
  handleUpdateView={() => {
    setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
    handleEdit(openViewModal.data || {});
  }}
  onClose={() => setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))}
/>



</Modal>

<button
  className="w-16 h-16 flex items-center rounded-full bg-blue-400 hover:bg-blue-700 fixed bottom-10 right-10 justify-center"
  onClick={() => {
    setEditModel({ type: "add", data: null, isShown: true });
  }}
>
  <MdAdd className="text-6xl text-white" />
</button>



</div>
      <ToastContainer />
    </div>
  );
};

export default Profile 
