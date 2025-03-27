import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { MdClose } from "react-icons/md"; 

const Taginput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addNewTag();
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      {/* {JSON.stringify(tags)} */}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3"> 
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center bg-blue-100 px-2 py-1 rounded-md">
              <GrMapLocation className="text-lg text-blue-400 mr-1" /> 
              {tag}
              <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-blue-500">
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-3 py-2 rounded-md"
          placeholder="Add Location"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button className="border rounded-md bg-blue-200" onClick={addNewTag}>
          <MdAdd className="text-3xl text-blue-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Taginput;
