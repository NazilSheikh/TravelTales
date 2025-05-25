import React, { useState } from 'react';
import lotusImg from '../assets/images/lotus.webp';
import travelimg from '../assets/images/q.jpeg'
import { Home, Compass, BookMarked, User, PenSquare, Menu } from 'lucide-react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Navbar from '../HomepageComponents/Navbar2';
export const Signup = () => {

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [name , setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // 
    console.log("Sending Request:", { name, email, password }); //  Debugging line
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/register',
        { name, email, password }, //  Ensure all fields are included
        { withCredentials: true } //  Enable cookies if needed
      );
      alert("Registration Successful!");
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };
  

  return (
    <>

      <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 mt-2 ">
      <div className="  w-full max-w-2xl shadow-2xl rounded-lg flex flex-col md:flex-row text-black ">

        {/* Left Section (Image & Text) */}

        <div className="h-[250px] md:h-[424px] mt-2   md:w-1/2 w-full bg-white     flex items-center justify-center">
         <img className='h-full w-full md:rounded-l-md   ' src={travelimg} alt="" />
        </div>

        {/* Right Section (Empty for now) */}

        <div className="h-full md:w-1/2 flex flex-col items-center justify-center bg-slate-200 rounded-r-lg p-5 mt-2">
        <div className="flex items-center">

<Link   className="flex items-center space-x-2  ">
  <Compass className="w-12 h-12 text-blue-600" />
  <span className="text-3xl font-bold text-gray-900">TravelTales</span>
</Link>
</div>

          <div className="text-center  text-black mb-4">
            <p className="text-xl font-semibold">Capture Your Journey!</p>
            <p className="text-sm"> 
            Create an account to start sharingt</p>
          </div>

          <form onSubmit={handleRegister} action="/signup" method="post" className="w-full flex flex-col items-center gap-4">
            
          <input
  className="px-3 py-2 border-2 rounded-md outline-none w-3/4"
  type="text"
  placeholder="Username"
  name="username"
  value={name} 
  onChange={(e) => setName(e.target.value)}
  required
/>
            
<input
  className="px-3 py-2 border-2 rounded-md outline-none w-3/4"
  type="email"
  placeholder="Email"
  name="email"
  value={email} 
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<input
  className="px-3 py-2 border-2 rounded-md outline-none w-3/4"
  type="password"
  placeholder="Password"
  name="password"
  value={password} // ✅ Ensure input reflects state
  onChange={(e) => setPassword(e.target.value)}
  required
/>

<input
  className="px-3 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:opacity-90 w-3/4"
  type="submit"
  value="Create"
/>

          </form>

          <div className="flex items-center justify-center gap-2 mt-4 ">
            <p>Already have an account?</p>
            <Link to="/login">
            <button  className="px-2 py-1 bg-transparent text-blue-600 hover:text-blue-700 rounded-md">Login</button>
            </Link>
          </div>
        </div>

      

      </div>
    </div>
    </>
  )
}

export default Signup ;
