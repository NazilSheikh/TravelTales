// import React from 'react';


// const Profileinfo = ({ getUserInfo, onLogout }) => {
  
//   // Function to Get Initials
//   const getInitials = (name) => {
//     if (!name) return "NS"; // Default Initials if Name Not Available
    
//     const nameParts = name.trim().split(" ");
//     if (nameParts.length === 1) {
//       return nameParts[0][0].toUpperCase(); // If only First Name
//     }
//     return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase(); // First Name + Last Name Initials
//   };

//   return (
//     (getUserInfo && <div className=' flex gap-6 md:flex-col flex-row '>
//       <form action="" className="w-full md:w-auto flex justify-center mt-2 md:mt-0 ">
//         <div className="relative w-full sm:w-64 md:w-80">
//           <input
//             type="text"
//             placeholder="Search Stories"
//             className="border px-10 py-2 rounded-md bg-slate-300 w-full"
//           />
//           <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
//         </div>
//       </form>

//       <div className="flex items-center gap-3 mt-2 md:mt-0">
//         <div className="h-10 w-10 flex items-center justify-center rounded-full bg-amber-200 text-sm">
//           {getInitials(getUserInfo?.name)}
//         </div>
//         <div className="text-center md:text-left">
//           <h1 className="text-sm md:text-base font-semibold">
//             {getUserInfo?.name || ""}
//           </h1>
//           <button
//             className="text-blue-500 text-xs md:text-sm"
//             onClick={onLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//     )
//   );
// };

// export default Profileinfo;


import React from 'react';

const Profileinfo = ({ getUserInfo, onLogout }) => {
  const getInitials = (name) => {
    if (!name) return "NS";
    const nameParts = name.trim().split(" ");
    return nameParts.length === 1
      ? nameParts[0][0].toUpperCase()
      : `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  };

  return (
    getUserInfo && (
      <div className="flex items-center gap-4 md:gap-6 ">
        {/* User Avatar */}
        <div className="h-10 w-10 flex items-center justify-center rounded-full border   text-slate-700 text-2xl">
          {getInitials(getUserInfo?.name)}
        </div>

        {/* User Name & Logout */}
        <div className="text-center md:text-left">
          <h1 className="text-lg text-blue-500 md:text-base font-semibold">
            {getUserInfo?.name || ""}
          </h1>
          <button className="   text-red-500 hover:text-red-800  text-lg md:text-sm" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default Profileinfo;
