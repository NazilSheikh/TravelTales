import React, { useState, useRef } from 'react';
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate, MdImage, MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Datepicker from '../components/Datepicker';
import ImageSelector from '../components/ImageSelector';
import Taginput from '../components/Taginput'
import moment from 'moment';
import { toast } from 'react-toastify';
import UploadImage from '../../utils/UploadImage'
const AddEditTravelStory = ({ type, storyInfo, onClose, getAllUserInfo }) => {
  
  const [title , setTitle ] = useState(storyInfo?.title || "");

  const [story , setStory] = useState(storyInfo?.story || "") ;
  const [image , setImage] = useState (storyInfo?.imageUrl || null) ;
  const [visitedDate , setVisitedDate] = useState(storyInfo?.visitedDate || null) ;
  const [visitedLocation , setVisitedLocation] = useState(storyInfo?.visitedLocation || []) ;
  const [error , setError] = useState("") ;
  
  


  // when taken input from user addding new card and adding all data to database  :
  // const addNewTravelStory = async()=>{

  //   try
  //   {
  //     let imageUrl = ""
  //     // Upload image at backend if present 
  //     if(image)
  //     {
  //       // for this see upload image.js in utils folder ,
  //       const imageUploadref = await UploadImage(image) ;
  //       // get the image url 
  //       imageUrl = imageUploadref.imageUrl || "" ;
  //     }

     
  //     const response = await axios.get('http://localhost:3000/api/users/getalltravelstory', {
             
  //       title , 
  //       heading , 
  //       story , 
  //       imageUrl : imageUploadref.imageUrl || "" ,
  //       visitedLocation ,
  //       visitedDate:visitedDate
  //        ? moment(visitedDate).valueOf()
  //        : moment().valueOf() ,
  //     });
      
  //     if(response.data && response.data.story)
  //     {
  //       toast.success("Story added succesfully")
  //     }

  //     // refreseh the stories
  //   getAllUserInfo()

  //   // close the card model or form
  //   onClose();

  //   } catch(error)
  //   {
        
  //   }




  // }

  const addNewTravelStory = async () => {
    try {
        let imageUrl = "";
        
        if (image) {
            const imageUploadRef = await UploadImage(image);
            imageUrl = imageUploadRef.imageUrl || "";
        }

        const response = await axios.post('http://localhost:3000/api/users/allrequired', {
          title, 
         
          story, 
          imageUrl, 
          visitedLocation,
          visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}` // Retrieve token from localStorage or context
          }
      });
      

        if (response.data && response.data.story) {
            toast.success("Story added successfully");
        }

        // Refresh the stories list
        await getAllUserInfo();

        // Close the modal
        onClose();
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message)
      {
        setError(error.response.data.message)
        console.error("Error adding story:", error);
        toast.error("Failed to add story");
      }
      else
      {
               setError("unexpected error occured while adding new story")
      }
    }
};



  // updating our travel story card : 
// const updateTravelStory = async() =>{ 
  
//   const storyId = storyInfo._id ;
//   if (!storyId) {
//     toast.error("Story ID is missing!");
//     return;
// }
// console.log("Updating story with ID:", storyId);

//   try {
//   let imageUrl = "";
  
//    const postData = {
    
//       title, 
//       heading, 
//       story, 
//       imageUrl:storyInfo.imageUrl||"" ,
//       visitedLocation,
//       visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
   
//    }
 
//     if(typeof image === "object")
//     {
//       // upload new image 
//       const imageUploadRef = await UploadImage(image);
//       imageUrl = imageUploadRef.imageUrl || "";

//       postData = {
//         ...postData,
//         imageUrl: imageUrl ,
//       } ;
//     }
 


//     await axios.put(`http://localhost:3000/api/users/edit-story/${storyId}`, postData, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//   });
  


//   if (response.data && response.data.story) {
//       toast.success("Story Updated successfully");
//   }

//   // Refresh the stories list
//   await getAllUserInfo();

//   // Close the modal
//   onClose();
// } catch (error) {
// if(error.response && error.response.data && error.response.data.message)
// {
//   setError(error.response.data.message)
//   console.error("Error adding story:", error);
//   toast.error("Failed to add story");
// }
// else
// {
//          setError("unexpected error occured while adding new story")
// }
// }} 

const updateTravelStory = async () => { 
  const storyId = storyInfo._id;
  if (!storyId) {
    toast.error("Story ID is missing!");
    return;
  }
  console.log("Updating story with ID:", storyId);

  try {
    let imageUrl = "";

    let postData = {  // ✅ Change `const` to `let`
      title,
      
      story,
      imageUrl: storyInfo.imageUrl || "",
      visitedLocation,
      visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
    };

    if (typeof image === "object") {
      // Upload new image
      const imageUploadRef = await UploadImage(image);
      imageUrl = imageUploadRef.imageUrl || "";

      postData = {
        ...postData,
        imageUrl: imageUrl,
      };
    }

    const response = await axios.put(
      `http://localhost:3000/api/users/edit-story/${storyId}`,
      postData,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    // if (response.data && response.data.story) {
      toast.success("Story updated successfully");
    // }

    // Refresh the stories list
    await getAllUserInfo();  // 

    // Close the modal
    onClose();
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
      console.error("Error updating story:", error);
      toast.error(error.response.data.message);  //
    } else {
      setError("Unexpected error occurred while updating the story");
      toast.error("Unexpected error occurred while updating the story");  r
    }
  }
};

 

  const handleupdateandadd =   () => {
    console.log("data taken from user in card : " , title  , story , image , visitedDate , visitedLocation)
      
      if(!title)
      {
         setError("Please enter the title ");
         return ;
      }
      if(!story)
      {
        setError("Please enter the story ");
        return ;
      }
  if(type=="edit")
  {
    updateTravelStory()
  }
  else
  {
    addNewTravelStory() ;
  }
  }; 

// Delete story image and update the story :

const handleDeleteStoryImg = async() =>{

}

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h5 className='text-xl font-medium text-slate-700'>
          {type === "add" ? "Add Story " : "Update Story"}
        </h5>

        <div>
          <div className='flex items-center gap-3'>
            {type === "add" ? (
              <button className='flex items-center gap-1 bg-blue-100 hover:bg-blue-200 rounded-md p-1' onClick={handleupdateandadd}>
                <MdAdd className="text-2xl text-slate-700" />
                Add Story
              </button>
            ) : (
              <>
                <button className='flex items-center text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md p-1' onClick={handleupdateandadd}>
                  <MdUpdate className="text-2xl text-blue-700" />
                  Update 
                </button>
              </>
            )}
            <button className='bg-blue-100 hover:bg-blue-200 rounded-md p-1' onClick={onClose}>
              <MdClose className="text-2xl text-slate-700" />
            </button>
          </div>

         {error && (
          <p className='text-red-500 text-right text-xs pt-2 '>{error}</p>
         )}


        </div>
      </div>

      <div  className="flex flex-col mt-5 gap-3">
        <h5 className="text-slate-700">TITLE</h5>
             <input  
              type='text' 
              value={title} 
              onChange={(e)=>setTitle(e.target.value)}
              className="border-none bg-gray-50 rounded-md p-1 text-1.5xl text-slate-700"
              placeholder="Enter Title "
              required
             />
        {/* <h1 className="text-2xl text-slate-700">Heading</h1> */}
        {/* <input  
              type='text' 
              value={heading} 
              onChange={(e)=>setHeading(e.target.value)}
              className="border-none bg-gray-50 rounded-md p-1 text-2xl text-slate-700"
              placeholder="Enter Heading "
              required
              
             /> */}

 

{/* Date Picker */}
 <Datepicker date = {visitedDate} setDate={setVisitedDate} />

        <ImageSelector img={image} setImg={setImage} handleDeleteImg={handleDeleteStoryImg}/>



        <div className="mb-4">
          <label className="block text-gray-700 mb-1">STORY</label>
          <textarea className="w-full p-2 border rounded-md h-24" placeholder="Write your story..."
          type = "text"
          value={story}
          onChange={(e)=>setStory(e.target.value)} 
          required 
          
          ></textarea>
        </div>

        <div className='pt-3'>
            <label className='text-slate-500  '>Visited Location</label>
            <Taginput tags={visitedLocation} setTags={setVisitedLocation}/>



        </div>


      </div>
    </div>
  );
};

export default AddEditTravelStory;



// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { MdDateRange, MdImage } from "react-icons/md";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const AddEditTravelStory = ({ type, storyInfo, onClose, getAllUserInfo }) => {
//   const [title, setTitle] = useState(storyInfo?.title || "");
//   const [heading, setHeading] = useState(storyInfo?.heading || "");
//   const [date, setDate] = useState(storyInfo?.date ? new Date(storyInfo.date) : new Date());
//   const [story, setStory] = useState(storyInfo?.story || "");
//   const [image, setImage] = useState(null);

//   const datePickerRef = useRef(null);

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("heading", heading);
//       formData.append("date", date);
//       formData.append("story", story);
//       if (image) {
//         formData.append("image", image);
//       }

//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.log("No Token Found");
//         return;
//       }

//       let url = "http://localhost:3000/api/users/addtravelstory";
//       let method = "post";

//       if (type === "edit" && storyInfo?._id) {
//         url = `http://localhost:3000/api/users/updatetravelstory/${storyInfo._id}`;
//         method = "put";
//       }

//       await axios({
//         method,
//         url,
//         data: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       getAllUserInfo();
//       onClose();
//     } catch (error) {
//       console.error("Error saving story:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-3">
//       <h5 className="text-slate-700">Title</h5>
      // <input
      //   type="text"
      //   value={title}
      //   onChange={(e) => setTitle(e.target.value)}
      //   className="border p-2 rounded-md"
      //   placeholder="Enter Title"
      //   required
      // />

//       <h1 className="text-2xl text-slate-700">Heading</h1>
//       <input
//         type="text"
//         value={heading}
//         onChange={(e) => setHeading(e.target.value)}
//         className="border p-2 rounded-md"
//         placeholder="Enter Heading"
//         required
//       />

//       <label className="block text-gray-700 mb-1">Select Date</label>
//       <div className="flex flex-col items-center w-fit">
//         <button
//           type="button"
//           className="flex items-center gap-2 text-blue-700 bg-blue-300 hover:bg-blue-400 p-1 rounded-md w-full"
//           onClick={() => datePickerRef.current.setOpen(true)}
//         >
//           <MdDateRange className="text-xl" />
//           {date.toDateString()}
//         </button>

//         <DatePicker
//           selected={date}
//           onChange={(newDate) => setDate(newDate)}
//           dateFormat="dd MMM yyyy"
//           ref={datePickerRef}
//           className="hidden"
//           popperPlacement="bottom"
//         />
//       </div>

//       {/* Image Upload */}
//       <div className="flex flex-col items-center justify-center rounded-md gap-3 h-48 w-full bg-gray-100">
//         <label htmlFor="imageUpload" className="cursor-pointer flex flex-col items-center">
//           <div className="flex flex-col justify-center items-center bg-gray-200 rounded-md hover:bg-gray-300">
//             <MdImage className="text-3xl text-blue-400" />
//           </div>
//           <span className="text-gray-600 text-sm">Browse Image Files</span>
//         </label>
//         <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handleImageChange} />
//       </div>

      // <label className="block text-gray-700 mb-1">Story</label>
      // <textarea
      //   className="w-full p-2 border rounded-md h-24"
      //   placeholder="Write your story..."
      //   value={story}
      //   onChange={(e) => setStory(e.target.value)}
      //   required
      // ></textarea>

//       <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-3">
//         {type === "edit" ? "Update Story" : "Add Story"}
//       </button>
//     </form>
//   );
// };

// export default AddEditTravelStory;
