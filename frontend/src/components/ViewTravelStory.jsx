import moment from 'moment';
import React from 'react'
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate, MdImage, MdDateRange } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
const ViewTravelStory = ({storyInfo , handleUpdateView , handleDeleteView ,onClose}) => {
  return (
    <div> 
           <div className='flex justify-end items-center'>
                 
        
                <div>
                  <div className='flex items-center gap-3'>
                    
                        <button className='flex items-center text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md p-1' onClick={handleUpdateView}>
                          <MdUpdate className="text-2xl text-blue-700" />
                          Update 
                        </button>
                        <button className='flex items-center text-red-700 bg-red-100 hover:bg-red-200 rounded-md p-1' onClick={handleDeleteView}>
                          <MdDeleteOutline className="text-2xl text-red-700" />
                          Delete  
                        </button>
                     
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


      </div>
              
    </div>
  )
}

export default ViewTravelStory