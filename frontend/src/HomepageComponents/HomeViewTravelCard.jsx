import React from 'react'
import moment from 'moment';
import { GrMapLocation } from "react-icons/gr";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate, MdImage, MdDateRange } from "react-icons/md";
import { FaUser, FaEnvelope } from "react-icons/fa"
const HomeViewTravelCard = ({storyInfo , onClose}) => {
  return (
    <div> 
    <div className='flex justify-end items-center'>
          
 
         <div>
           <div className='flex items-center gap-3'>
             
                 
              
             <button className='bg-blue-100 hover:bg-blue-200 rounded-md p-1' onClick={onClose}>
               <MdClose className="text-2xl text-slate-700" />
             </button>
           </div>
 
         
 
 
         </div>
       </div> 


       <div  className="flex flex-col mt-5 gap-2">
 <h1 className="text-slate-700 text-2xl">{storyInfo && storyInfo.title}</h1>
      



 

 <div className='flex   items-center justify-center  '>


 <div
   className="flex items-center gap-2 text-slate-700  w-full"
 >
   <MdDateRange className="text-xl" />
   {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
 </div>

 
 <div className=" flex items-center gap-2  bg-blue-100  p-1 rounded-md  w-fit   "> 
  
   <GrMapLocation className="text-3xl  text-blue-400 mr-1" /> 
    
      

   {storyInfo?.visitedLocation?.length > 0
? storyInfo.visitedLocation.map((item, index) => 
index === storyInfo.visitedLocation.length - 1 ? `${item}` : `${item} , `
)
: " Location not available"}

   </div>
 


   </div>








  <div className="w-full max-w-md rounded-md overflow-hidden relative">
                     {/* Add relative here to position the delete button correctly */}
                     <img
                         src={storyInfo && storyInfo.imageUrl}
                         alt="selected"
                         className="w-full h-auto rounded-md object-contain"
                     />
                      
                 </div>

    <div>
    <p className='text-sm text-slate-950 leading-6 text-justify whitespace-pre-line '>
{storyInfo?.story || "No story available"}
</p>
     
     </div>             

{/* <div>
<p className="text-gray-500 text-lg "> Story By : {storyInfo?.name || "No user found"} <br /> 
Email : {storyInfo?.email || "No Email found "}</p>  
</div> */}


<div className="bg-blue-100 p-4 rounded-lg shadow-md w-fit">
  <p className="flex items-center gap-2 text-gray-700 font-semibold text-lg">
    <FaUser className="text-blue-500" />  {storyInfo?.name || "No user found"}
  </p>
  <p className="flex items-center gap-2 text-gray-600 text-base mt-1">
    <FaEnvelope className="text-red-500" /> {storyInfo?.email || "No Email found"}
  </p>
</div> 
</div>
       
</div> 
  )
}

export default HomeViewTravelCard
 