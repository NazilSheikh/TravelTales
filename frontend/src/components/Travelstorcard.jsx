 

import React from 'react';
import moment from 'moment/moment';
import { GrMapLocation } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa';

const Travelstorcard = ({
  imageUrl,
  title,
  date,
  isFavourite,
  visitedLocation = [], // Default to an empty array
  onFavouriteClick,
  story,
  onClick,
}) => {
  return (
    <div className='border rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out cursor-pointer relative'>
      <img
        src={imageUrl}
        alt={title}
        className='w-full h-56 object-cover rounded-lg'
        onClick={onClick}
      />

      <button
        className='w-12 h-12 flex items-center justify-center border-white/40 rounded-lg absolute top-4 bg-white/30 right-4 transition-all'
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`icon-btn ${isFavourite ? 'text-red-500' : 'text-white'} hover:text-red-500`}
        />
      </button>

      <div className='p-4' onClick={onClick}>
        <div className='flex items-center gap-3'>
          <div className='flex-1'>
            <h6 className='text-sm'>{title}</h6>
            <span className='text-sm text-slate-500'>
              {date ? moment(date).format('DD MMM YYYY') : '-'}
            </span>
            <p className='text-xs text-slate-600 mt-2'>{story?.slice(0, 60)}</p>
            <div className='inline-flex items-center mt-2 rounded-md px-1 gap-2 text-sm gap-2 text-blue-600 bg-blue-200'>
              <GrMapLocation className="text-sm" />
              {/* if you have more than one location then add like this india , dubai  */}
              {visitedLocation && visitedLocation.map((item, index) =>
                visitedLocation.length === index + 1 ? `${item}` : `${item} , `
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travelstorcard;