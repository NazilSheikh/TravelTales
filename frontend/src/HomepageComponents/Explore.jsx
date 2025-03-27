import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import  Button  from '../HomepageComponents/Button'
import Navbar from './Navbar2';
import SearchBar from '../components/SearchBar';
import Travelstorcard from '../components/Travelstorcard';
import HomeViewTravelCard from '../HomepageComponents/HomeViewTravelCard';
import { DayPicker } from "react-day-picker";
import FilterInfoTitle from '../../cards/FilterInfoTitle';
import Modal from "react-modal"
import axios from 'axios'
import moment from 'moment';
import FooterHome from './FooterHome';

const Explore = () => {
    const [stories, setStories] = useState([]);
    // this is used to view our story but with changes 
   const [openViewModal , setOpenViewModal] = useState({
    isShown : false  , data:null 
   })
   const [searchQuery , setSearchQuery] = useState("");
   const [filterType , setFilterType] = useState('');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  
    const getAllUserInfo = async () =>{
      try {
        console.log("ALL User PUBLIC  Info...");
  
        
   
  
        const response = await axios.get('http://localhost:3000/api/users/getpublicstories');
  
        console.log("Full All user  Response:", response);
        response.data.stories.forEach(story => {
          console.log(`Story by: ${story.name}, Email: ${story.email}`);
      });
      
        if (response.data && response.data.stories && response.data.stories.length > 0) {
          setStories(response.data.stories);
          console.log("Found ALL USERS INFO:", response.data.stories);
  
          response.data.stories.forEach(story => {
            console.log(`Story by: ${story.name}, Email: ${story.email}`);
        });
        
  
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
    }
    useEffect(() => {
      getAllUserInfo();
    }, []);
    
    // const handlViewStory = (data)=>{
    //   setOpenViewModal({isShown:true , data});
    // }
  
    const handlViewStory = (data) => {
      setOpenViewModal({
        isShown: true,
        data: { ...data, name: data.name, email: data.email } // Include name & email
      });
    };

    const onSearchStory = async () => {
        try { 
          const response = await axios.get('http://localhost:3000/api/users/search', {
            params: {
              query: searchQuery, // Use searchQuery state variable
            }
      
          });
      
          if (response.data && response.data.story) {
            setFilterType("search");
            setStories(response.data.story);
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
         
        const startDate = day.from ? moment(day.from).valueOf() : null ;
        const endDate = day.to ? moment(day.to).valueOf() :null ;
        
        if(startDate && endDate)
        {
          const response = await axios.get('http://localhost:3000/api/users/filterbydate' , 
            {
              
              // this are the parameters that we have give in postman for searching the stories by date
               params:{ startDate , endDate} ,
        }) ;
        if (response.data && response.data.story) {
          setFilterType("date");
          setStories(response.data.story);
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
      const handleSearch = () =>{

        if(searchQuery)
        {
          onSearchStory(searchQuery) ;
        }
    
      } ;
    
      const onClearSearch = () =>{
        handleClearSearch();
        setSearchQuery("");
      } ;
  return (
    <div className="bg-gray-50 min-h-screen">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16   ">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <h2 className="text-3xl font-bold text-gray-900">Explore Stories</h2>
    
          {/* Search Bar */}
          
          <div className="w-full sm:w-1/3">
            <SearchBar
               value={searchQuery}
               onChange={({target}) => {
                 setSearchQuery(target.value)
               }}
               handleSearch={handleSearch}
               onClearSearch={onClearSearch}
            />
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mt-6 gap-4">
          <div className="w-full lg:w-auto">
            <FilterInfoTitle
              filterType={filterType}
              filterDates={dateRange}
              onClear={resetFilter}
            />
          </div>

       {/* Date Picker */}
       
<div className="w-full sm:w-[320px] bg-white border border-gray-300 shadow-md rounded-lg p-4">
  
  <div className="w-full">
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
      </div>

      {/* Stories Section */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending Travel Tales</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.length > 0 ? (
              stories.slice().reverse().map((story) => (
                <Travelstorcard
                  key={story._id}
                  imageUrl={story.imageUrl}
                  title={story.title}
                  visitedLocation={story.visitedLocation}
                  date={story.visitedDate}
                  story={story.story}
                  isFavourite={story.isFavourite}
                  onClick={() => handlViewStory(story)}
                  onFavouriteClick={() => console.log("Favorite Clicked:", story)}
                  name={story.name}
                  email={story.email}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">No stories found!</p>
            )}
          </div>
        </div>
      </section>

      {/* Modal View */}
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
<HomeViewTravelCard 
  storyInfo={openViewModal.data || {}}  // Instead of null, pass an empty object
  
  onClose={() => setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))}
/>



</Modal>
    </main>

    <FooterHome/>
  </div>
  );
};

export default Explore;
