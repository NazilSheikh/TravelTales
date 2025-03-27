import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import  Button  from '../HomepageComponents/Button'
import Navbar from '../HomepageComponents/Navbar2';
import Travelstorcard from '../components/Travelstorcard';
import HomeViewTravelCard from '../HomepageComponents/HomeViewTravelCard';
import { useState , useEffect } from 'react';
import Modal from "react-modal"
import axios from 'axios'
import FooterHome from '../HomepageComponents/FooterHome';
import { Compass,   Heart, Share2, Clock, User2, Globe2, Camera, Award, Users, Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';
const Home = () => {
  
  const [stories, setStories] = useState([]);
  // this is used to view our story but with changes 
 const [openViewModal , setOpenViewModal] = useState({
  isShown : false  , data:null 
 })


  const getAllUserInfo = async () =>{
    try {
      console.log("ALL User PUBLIC  Info...");

      
 

      const response = await axios.get('http://localhost:3000/api/users/getpublicstories');

      console.log("Full All user  Response:", response);
      response.data.stories.forEach(story => {
        console.log(`Story by: ${story.name}, Email: ${story.email}`);
    });
    
      if (response.data && response.data.stories && response.data.stories.length > 0) {
        setStories(response.data.stories);
        console.log("Found ALL USERS INFO:", response.data.stories);

        response.data.stories.forEach(story => {
          console.log(`Story by: ${story.name}, Email: ${story.email}`);
      });
      

      } else {
        console.log("No User Data Found ❌");
      }
      
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized! Redirecting...");
        localStorage.clear();
        navigate("/login");
      }
    }
  }
  useEffect(() => {
    getAllUserInfo();
  }, []);
  
  // const handlViewStory = (data)=>{
  //   setOpenViewModal({isShown:true , data});
  // }

  const handlViewStory = (data) => {
    setOpenViewModal({
      isShown: true,
      data: { ...data, name: data.name, email: data.email } // Include name & email
    });
  };
  

  return (
    <div>
    <Navbar/>
   
    <div className="pt-16">

      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Share Your Journey,<br />Inspire the World
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Document your adventures and connect with fellow travelers through compelling stories and stunning photographs.
            </p>
            <Button size="lg" className="group">
              Start Your Story
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>


      <div className="py-16 bg-white " >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Globe2 className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Global Community</h3>
                <p className="text-gray-600">Connect with travelers from around the world</p>
              </div>
              <div className="text-center">
                <Camera className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Visual Stories</h3>
                <p className="text-gray-600">Share your journey through stunning photos</p>
              </div>
              <div className="text-center">
                <Award className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Featured Content</h3>
                <p className="text-gray-600">Get featured in our weekly highlights</p>
              </div>
               
            </div>
          </div>
        </div>

      {/* Featured Stories */}
     <section className="py-16 bg-white">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
        {stories.length > 0 ? (
  stories
    .slice(-3) // Get the last 3 stories (latest ones)
    .reverse() // Reverse to show the newest first
    .map((story) => (
      <Travelstorcard
        key={story._id}
        imageUrl={story.imageUrl}
        title={story.title}
        visitedLocation={story.visitedLocation}
        date={story.visitedDate}
        story={story.story}
        isFavourite={story.isFavourite}
        onClick={() => handlViewStory(story)}
        onFavouriteClick={() => console.log("Favorite Clicked:", story)}
        name={story.name}   
        email={story.email} // Pass email
      />
    ))
) : (
  <p>No stories found!</p>
)}


        </div>
      </div>

<Modal
  isOpen={openViewModal.isShown}
  onRequestClose={() => {
    // setEditModel({ isShown: false, data: null, type: "add" });
  }}
  onAfterOpen={() => {
    const root = document.getElementById("root");
    root.style.overflow = "hidden"; // Disable background scroll
  }}
  onAfterClose={() => {
    const root = document.getElementById("root");
    root.style.overflow = "auto"; // Enable background scroll again
  }}
  style={{
    overlay: {
      background: "rgba(0 , 0 , 0 , 0.2)",
      zIndex: 999,
    },
  }}
  appElement={document.getElementById("root")}
  className="model-box w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 z-50"
>

{/* to view the entire card :  different component */}
{/* when we click on card onclick we will view the entire card  */}
<HomeViewTravelCard 
  storyInfo={openViewModal.data || {}}  // Instead of null, pass an empty object
  
  onClose={() => setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))}
/>



</Modal>

    </section>

    </div>
 
  <FooterHome/>

    </div>
  );
};

export default Home;

