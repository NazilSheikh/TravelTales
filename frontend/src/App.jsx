// import { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import Login from "./screens/Login"
// import { Signup } from './screens/Signup'
// import { Profile } from './screens/Profile'
// import Home from './screens/Home'
// function App() {

//   return (
//     <>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Routes path = '/' element = {<Home/>} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/signup' element={<Signup />} />

//           {/* Protected Route for Profile */}
//           <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />

//           {/* Redirect Unknown Routes to Login */}
//           <Route path='*' element={<Navigate to="/" />} />
//         </Routes>
//       </Router>
//     </>
//   )
// }

// // ✅ Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const isAuthenticate = !!localStorage.getItem("token");

//   if (!isAuthenticate) {
//     alert("Please Login First 😎");
//     return <Navigate to="/" />
//   }

//   return children;
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import Login from './screens/Login.jsx';
import { Signup } from './screens/Signup';
import { Profile } from './screens/Profile';
import Home from './screens/Home';
import Explore from './HomepageComponents/Explore'
function App() {
  return (
    <Router>

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/explore' element ={<Explore/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        {/* Protected Route for Profile */}
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Redirect Unknown Routes to Home */}
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
      
    </Router>
  );
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticate = !!localStorage.getItem("token");

  if (!isAuthenticate) {
    alert("Please Login First 😎");
    return <Navigate to="/" />
  }

  return children;
}

export default App;
