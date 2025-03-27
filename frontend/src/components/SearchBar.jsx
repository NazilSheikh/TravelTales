import React from 'react'
import {IoMdClose} from  'react-icons/io'
const SearchBar = ({value , onChange , handleSearch , onClearSearch}) => {
  return (
    <div> <div className="w-full md:w-auto flex justify-center mt-2 md:mt-0">
            <div className="relative max-w-[300px] md:max-w-[400px] w-full">
              <input
                type={value}
                placeholder="Search Stories"
                className="border px-10 py-2 rounded-md bg-gray-200 w-full"
                onChange={onChange}
              />
              {/* when you are providing some values to search bar this button will occur at right to delete what you have written  */}
              {
                value && <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-gray-800  absolute right-9 top-1/2 transform -translate-y-1/2    " onClick={onClearSearch} 
                
                />
              }
              <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
              onClick={handleSearch}
              ></i>
            </div>
          </div>
          </div>
  )
}

export default SearchBar