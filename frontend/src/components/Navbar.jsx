// import React from 'react'
// import lotusImg from '../assets/images/travelocity-logo-1.png';
// import { useNavigate } from 'react-router';
// import Profileinfo from '../../cards/Profileinfo';
// const Navbar = ({getUserInfo}) => {
// const isToken = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const onLogout = () =>{
//     localStorage.clear();
//     navigate("/login")
//   }


//   return (
//     <div className="w-full h-18 flex flex-wrap md:flex-nowrap justify-between shadow-2xl items-center px-4 py-2 bg-white">
//     {/* Logo */}
//     <div className="h-[60px] w-[150px] md:h-[80px] md:w-[180px]">
//       <img className="w-full h-full" src={lotusImg} alt="Lotus" />
//     </div>
     
//      {/* profile info */}
//       {isToken && <Profileinfo getUserInfo={getUserInfo} onLogout={onLogout} />}
      
//      {/* <h1>{getUserInfo.name}</h1> */}

//   </div>
//   )
// }

// export default Navbar

// import React from 'react';
// import lotusImg from '../assets/images/travelocity-logo-1.png';
// import { useNavigate } from 'react-router';
// import Profileinfo from '../../cards/Profileinfo';
// import SearchBar from './SearchBar' ;
// const Navbar = ({ getUserInfo , searchQuery , setSearchQuery  , onSearchNote , handleClearSearch }) => {
//   const isToken = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const onLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

  


//   const handleSearch = () =>{

//     if(searchQuery)
//     {
//       onSearchNote(searchQuery) ;
//     }

//   } ;

//   const onClearSearch = () =>{
//     handleClearSearch();
//     setSearchQuery("");
//   } ;

// //   <div className="h-[50px] md:h-[100px] w-[140px] md:w-[200px]  ">
// //   <img className="w-full h-full object-contain" src={lotusImg} alt="Logo" />
// // </div>


//   return (
//     <div className="w-full h-18 flex flex-col md:flex-row justify-between items-center px-4 py-3 bg-white shadow-lg">
//       {/* Logo */}
     
     

//       {/* Profile Info */}
//       {isToken && (
      
//       <>
//       <SearchBar 
      
//       value={searchQuery}
//       onChange={({target}) => {
//         setSearchQuery(target.value)
//       }}
//       handleSearch={handleSearch}
//       onClearSearch={onClearSearch}

//       />
      
//       <Profileinfo getUserInfo={getUserInfo} onLogout={onLogout} />{" "}
//       </>
//       )}
//     </div>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, BookMarked, User, PenSquare, Menu, LogOut } from 'lucide-react';
import Button from '../HomepageComponents/Button';
import SearchBar from './SearchBar';

const Navbar = ({ getUserInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isToken = localStorage.getItem("token");

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    // { path: '/profile', label: 'My Stories', icon: BookMarked },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSearch = () => {
    if (searchQuery) onSearchNote(searchQuery);
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery('');
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.trim().split(" ");
    return nameParts.length === 1
      ? nameParts[0][0].toUpperCase()
      : `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Compass className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TravelTales</span>
            </Link>
          </div>

          {/* Desktop Navigation + Search Bar */}
          <div className="hidden md:flex items-center space-x-6">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />

            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}

            {/* <Button variant="primary" size="sm">
              <PenSquare className="w-4 h-4 mr-2" />
              Add Story
            </Button> */}

            {/* User Info (If Logged In) */}
            {isToken && (
              <div className="flex items-center space-x-4 ml-4">
                     <div className="h-10 w-10 flex items-center justify-center rounded-full border bg-yellow-100   text-slate-700 text-2xl">
          {getInitials(getUserInfo?.name)}
        </div>
                <span className="text-gray-700   text-2xl font-bold underline ">{getUserInfo?.name}</span>
                <button 
    onClick={handleLogout} 
    className="flex items-center gap-2 bg-red-500  text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-300"
  >
    <LogOut className="w-5 h-5" />
    <span className="font-medium">Logout</span>
  </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden  flex flex-col space-y-2 p-4 bg-white shadow-md">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />

            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}

            {/* <Button variant="primary" size="sm" className="w-full mt-2">
              <PenSquare className="w-4 h-4 mr-2" />
              Add Story
            </Button> */}

            {/* User Info (In Mobile Menu) */}
            {isToken && (
              <div className="flex items-center justify-between px-3 py-2 ">
                <div className="h-10 w-10 flex items-center justify-center rounded-full border gap-4 ml-6  bg-yellow-100  text-slate-700 text-2xl">
          {getInitials(getUserInfo?.name)}
        
        </div>
        <span className="text-gray-700 font-medium text-2xl underline ml-3 ">{getUserInfo?.name}</span>
                <button 
    onClick={handleLogout} 
    className="flex items-center gap-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-300"
  >
    <LogOut className="w-4 h-4" />
    <span className="font-medium">Logout</span>
  </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
