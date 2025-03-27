import React from 'react'
import { useState , useRef } from 'react';
import {  MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Datepicker = ({date , setDate}) => {


  const datePickerRef = useRef(null); // Reference for DatePicker

  // const formatDate = (date) => {
  //   if (!date) return "Select a date"; // Prevents errors when date is undefined
  
  //   const options = { day: "numeric", month: "short", year: "numeric" };
  //   let formatted = date.toLocaleDateString("en-GB", options);
  
  //   // Add "st", "nd", "rd", "th" to day
  //   const day = date.getDate();
  //   const suffix =
  //     day % 10 === 1 && day !== 11
  //       ? "st"
  //       : day % 10 === 2 && day !== 12
  //       ? "nd"
  //       : day % 10 === 3 && day !== 13
  //       ? "rd"
  //       : "th";
  
  //   return formatted.replace(/^\d+/, `${day}${suffix}`);
  // };
  
  const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) return "Select a date"; // Ensure date is valid
  
    const options = { day: "numeric", month: "short", year: "numeric" };
    let formatted = date.toLocaleDateString("en-GB", options);
  
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
  
    return formatted.replace(/^\d+/, `${day}${suffix}`);
  };
  
  return (
    <div>
           

       <label className="block text-gray-700 mb-1">Select Date</label>
      <div className="  justify-center  flex w-fit inline-block flex-col items-center">  
        
        
        {/* Button to open Date Picker */}
        <button
          className="flex items-center gap-2 text-blue-700 bg-blue-300 hover:bg-blue-400 p-1  rounded-md w-full"
          onClick={() => datePickerRef.current.setOpen(true)} // Open calendar on click
        >
          <MdDateRange className="text-xl" />
          {formatDate(date)}
        </button>
      
        {/* Positioned DatePicker */}
        <div className="absolute w-fit inline-block  left-1/2 transform -translate-x-1/2 mt-2 z-50">
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd MMM yyyy"
            ref={datePickerRef} 
            className="hidden opacity-0 "
            popperPlacement="bottom" // Ensure proper dropdown
          />
        </div>
      </div>
    </div>
  )
}

export default Datepicker