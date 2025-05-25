// import React from 'react'
// import lotusImg from '../assets/images/lotus.webp';
// const login = () => {
//   return (
//     // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#6a11cb] to-[#2575fc]">
      
//     // </div>
//     <div className="min-h-screen flex items-center justify-center shadow-lg ">
      
//       <div className="h-[500px] w-[800px]  bg-slate-500">
        
      

// <div className="h-[500px] w-[400px] flex-col items-center px-10   justify-center bg-red-400">

//   <div className = " ml-20 h-[100px] w-[100px]  " >
//   <img className='w-full h-full '  src={lotusImg} alt="alt1" />
//   </div>

//         <div className='px-10 flex-col mb-3 '>

//   <p>Capture Your Journey ! </p>
//   <p>Please Login To Your Account </p>
//         </ div>
 
 

//   <form action="/login" method="post" className="flex items-center justify-center ">
//   <div className="flex flex-col  w-96 h-60 gap-5 rounded-lg ">
//     <input 
//       className="px-3 py-2 border-2 rounded-md outline-none" 
//       type="email" 
//       placeholder=" email" 
//       name="email" 
//       required 
//     />

//     <input 
//       className="px-3 py-2 border-2 rounded-md outline-none" 
//       type="password" 
//       placeholder=" password" 
//       name="password" 
//       required 
//     />

//     <input 
//       className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600" 
//       type="submit" 
//       value="Login" 
//     />
//   </div>
// </form>



// <div className='flex px-5 gap-5 items-center justify-center   '> <p> Don't  have account ?</p> <button className='px-2 py-1 bg-blue-500 rounded-md '>Create new </button>  </div>



// </div>


//       </div>



//     </div>
//   )
// }

// export default login



import React, { useState } from 'react';
import lotusImg from '../assets/images/lotus.webp';
import travelimg from '../assets/images/p.jpeg'
import { Link, redirect } from 'react-router';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from '../HomepageComponents/Navbar2';
 
import { Home, Compass, BookMarked, User, PenSquare, Menu } from 'lucide-react';
const Login = () => {
  
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async(e) =>{    
  e.preventDefault(); //  
  try{

    const {data} = await axios.post('http://localhost:3000/api/users/login' , {email , password}) ;
    localStorage.setItem("token" , data.token) ;
    navigate('/profile');
  }
  catch
  {
    alert("Please Enter Correct Credentials") ;
  }
}

  return (

    
    <>
    <Navbar/>

    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 ">
      <div className="  w-full max-w-2xl shadow-2xl rounded-lg flex flex-col md:flex-row text-black ">

        {/* Left Section (Image & Text) */}
        <div className="h-full md:w-1/2 flex flex-col items-center justify-center bg-slate-200 rounded-l-lg p-5">
        <div className="flex items-center">

            <Link   className="flex items-center space-x-2 mt-10 mb-5">
              <Compass className="w-12 h-12 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">TravelTales</span>
            </Link>
          </div>

          <div className="text-center  text-black mb-6">
            <p className="text-xl font-semibold "> 
            Welcome back!
</p>
            <p className="text-sm">Sign in to continue sharing your adventures</p>
          </div>

          <form onSubmit={handleLogin}  action="/login" method="post" className="w-full flex flex-col items-center gap-4">
            <input
  className="px-3 py-2 border-2 rounded-md outline-none w-3/4"
  type="email"
  placeholder="Email"
  name="email"
  value={email} // 
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
  // className="px-3 py-2 bg-gradient-to-r from-[#ee7724] via-[#d8363a] via-[#dd3675] to-[#b44593] text-white rounded-md cursor-pointer hover:opacity-90 w-3/4"
   className="px-3 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:opacity-90 w-3/4"
  type="submit"
  value="Login"
/>

          </form>

          <div className="flex items-center justify-center gap-2 mt-4 ">
            <p>Don't have an account?</p>
            <Link to="/signup">
            {/* <button  className="px-2 py-1 bg-transparent text-violet-500 hover:text-violet-700 rounded-md">Create New</button> */}
            <button  className="px-2 py-1 bg-transparent text-blue-600 hover:text-blue-700 rounded-md">Create New</button>
            </Link>
          </div>
        </div>

        {/* Right Section (Empty for now) */}
        <div className="h-[200px] md:h-auto     md:w-1/2 w-full bg-white     flex items-center justify-center">
         <img className='h-full w-full md:rounded-r-md   ' src={travelimg} alt="" />
        </div>

      </div>
    </div>
    </>
  );
};

export default Login;



