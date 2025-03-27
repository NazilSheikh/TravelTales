import React, { useEffect, useRef, useState } from 'react';
import { MdDeleteOutline, MdImage } from "react-icons/md";

const ImageSelector = ({ img, setImg ,handleDeleteImg }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImg(file);
        }
    };
    const handleRemoveImage = () =>{
        setImg(null) ;
        handleDeleteImg() ;
    }
    const onChooseFile = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        if (typeof img === 'string') {
            setPreviewUrl(img);
        } else if (img) {
            setPreviewUrl(URL.createObjectURL(img));
        } else {
            setPreviewUrl(null);
        }

        return () => {
            if (previewUrl && typeof previewUrl !== 'string' && !img) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [img]);

    return (
        <div className="flex flex-col items-center justify-center rounded-md gap-3 w-full bg-gray-100 p-16">
            <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
            />

            {!img ? (
                <button
                    className="cursor-pointer flex flex-col items-center"
                    onClick={onChooseFile}
                >
                    <div className="flex flex-col justify-center items-center bg-gray-200 rounded-md hover:bg-gray-300 p-1">
                        <MdImage className="text-3xl text-blue-400" />
                    </div>
                    <span className="text-gray-600 text-sm">Browse Image Files</span>
                </button>
            ) : (
                <div className="w-full max-w-md rounded-md overflow-hidden relative">
                    {/* Add relative here to position the delete button correctly */}
                    <img
                        src={previewUrl}
                        alt="selected"
                        className="w-full h-auto rounded-md object-contain"
                    />
                    <button 
                        className="absolute top-2 right-2 bg-red-300 hover:bg-red-500 p-1 rounded-full"
                        onClick={ handleRemoveImage} // Handle image removal
                    >
                        <MdDeleteOutline className="text-3xl text-white" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageSelector;
