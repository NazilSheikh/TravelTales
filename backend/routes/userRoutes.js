const express = require('express');
const app = express();
const User = require('../models/User');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
require('dotenv').config(); // For accessing process.env.JWT_SECRET
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json()); // ✅ Middleware to parse JSON
router.use(cookieParser());
const TravelSchema = require('../models/travelStorymodel.js');
// const upload = require('./multer.js');
const upload = require("./multer.js"); 
const fs = require("fs");
const path = require("path") ;
const { error } = require('console');

app.post('/register', async (req, res) => {
    console.log("Request Body:", req.body);  // ✅ Debugging line
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" }); 
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashedPassword });

        const token = jsonwebtoken.sign(
            { email: newUser.email, userid: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({ message: "Registered Successfully" });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

app.post('/login' , async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).send("User not found");
      }

      // Compare password
      bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).send("Error during password comparison");
          }

          if (result) {
              // Password matched
              const token = jsonwebtoken.sign(
                  { email: user.email, userid: user._id },
                  process.env.JWT_SECRET,
                  { expiresIn: '1h' }
              );

              res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
              res.status(200).json({ message: "Logged in Successfully", token });
              // ✅ Only one response
          } else {
              return res.status(401).send("Invalid credentials");
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
});

function isLoggedIn(req, res, next) {
    console.log("Cookies received:", req.cookies);
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check cookies and headers
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}

app.get('/get-user', isLoggedIn, async (req, res) => {
    try {
        let user = await User.findOne({ email: req.user.email }).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);  // ✅ Return user details
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});


// app.post('/allrequired', isLoggedIn, async (req, res) => {
//     const { title, story, visitedLocation, imageUrl, visitedDate   } = req.body;
//     const { userid } = req.user; // Destructuring userId
//     console.log(userid);
//     if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
//         return res.status(400).json({ error: true, message: "All fields are required" });
//     }
//     // Convert visitedDate from milliseconds to Date object
//     const parsedVisitedDate = new Date(parseInt(visitedDate));
//     try {
//         const travelStory = new TravelSchema({
//             title,
//             story,
//             visitedLocation,
//             imageUrl,
//             visitedDate: parsedVisitedDate,
//             userid ,
             
//         });
//         await travelStory.save();
//         return res.status(201).json({ story: travelStory, message: "Added Successfully" });
//     } catch (error) {
//         return res.status(400).json({ error: true, message: error.message});
//     }
// });

// app.get('/getalltravelstory' , isLoggedIn , async(req , res)=>{

//     const {userid} = req.user;
//     try{
//         const TravelStory = await TravelSchema.findOne({userid : userid}).sort({isFavorite:-1});
//             res.status(201).json({story : TravelStory});
//     }
//     catch(error)
//     {
//           res.status(400).json({error : true , message : error.message})
//     }

// }) ;


// THIS UPLOAD IS COMMING FROM MULTER.JS

app.post('/allrequired', isLoggedIn, async (req, res) => {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userid, email } = req.user; // Extract user ID and email from token

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    try {
        // Fetch user's name from database using userid
        const user = await User.findById(userid).select('name');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Convert visitedDate from milliseconds to Date object
        const parsedVisitedDate = new Date(parseInt(visitedDate));

        const travelStory = new TravelSchema({
            title,
            story,
            visitedLocation,
            imageUrl,
            visitedDate: parsedVisitedDate,
            userid,
            name: user.name, // Use logged-in user's name
            email         // Use logged-in user's email
        });

        await travelStory.save();
        return res.status(201).json({ story: travelStory, message: "Added Successfully" });
    } catch (error) {
        return res.status(400).json({ error: true, message: error.message });
    }
});




app.get('/getalltravelstory', isLoggedIn, async (req, res) => {
    const { userid } = req.user;
    try {
      const TravelStory = await TravelSchema.find({ userid: userid }).sort({ isFavorite: -1 });
      res.status(201).json({ story: TravelStory }); // Keep 'story' key as array
    } catch (error) {
      res.status(400).json({ error: true, message: error.message });
    }
  });
//   This will return all stories, so anyone (logged in or not) can explore them.
//   app.get('/getpublicstories', async (req, res) => {
//     try {
//         const TravelStories = await TravelSchema.find().sort({ createdAt: -1 }); // Sort by newest first
//         res.status(200).json({ stories: TravelStories });
//     } catch (error) {
//         res.status(400).json({ error: true, message: error.message });
//     }
// });

app.get('/getpublicstories', async (req, res) => {
    try {
        const TravelStories =  await TravelSchema.find()
        .select('title story visitedLocation imageUrl visitedDate name email userid createdOn isFavorite')
        .sort({ createdAt: -1 });
     // Sort by newest first
        res.status(200).json({ stories: TravelStories });
    } catch (error) {
        res.status(400).json({ error: true, message: error.message });
    }
});


app.post('/upload-image' , isLoggedIn , upload.single("image") , async(req , res)=>
{
    try
    {
        if(!req.file)
        {
            return res.status(400).json({error:true , message: "No image uploaded "});
        }
        const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
       res.status(201).json({imageUrl}); 
       console.log(req.file.filename);

    }
    catch(error)
    {
         res.status(400).json({error: true , message: error.message});
    }
})

// to get image on postman server static file to show in it 

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.delete('/delete-image', isLoggedIn, async (req, res) => {
    const { imageUrl } = req.query;
    if (!imageUrl) {
        return res.status(401).json({ message: "File parameter is required" });
    }

    try {
        const filename = path.basename(imageUrl);
        const filepath = path.join(__dirname, '../uploads', filename);

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            return res.status(200).json({ error: false, message: "Image deleted successfully" }); // Added return here
        } 
        else {
            return res.status(404).json({ error: true, message: "Image not found" }); // Added return here
        }
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message }); // Added return here
    }
});

// update All travel story data ;

app.put("/edit-story/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params; // Get id from URL
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const userid = req.user.userid; // Fix here by accessing only userid
    const parsedVisitedDate = new Date(parseInt(visitedDate));
  
    try {
      if (!title || !story || !visitedLocation || !visitedDate) {
        return res.status(404).json({ error: true, message: "All fields are required" });
      }
  
      const placeholderUrl = `http://localhost:3000/assets/pexels-stywo-1261728.jpg`;
  
      const travelStory = await TravelSchema.findOne({ _id: id, userid: userid });
  
      if (!travelStory) {
        return res.status(404).json({ error: true, message: "Story not found" });
      }
  
      travelStory.title = title;
      travelStory.story = story;
      travelStory.visitedLocation = visitedLocation;
      travelStory.imageUrl = imageUrl || placeholderUrl;
      travelStory.visitedDate = parsedVisitedDate;
  
      await travelStory.save();
  
      return res.status(200).json({ error: false, message: "Updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
    }
  });
  


app.delete("/delete/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { userid } = req.user;
  
    try {
      // Find the travel story by ID and authenticated user
      const user = await TravelSchema.findOne({ _id: id, userid: userid });
      if (!user) {
        return res.status(404).json({ error: true, message: "Travel story not found" });
      }
  
      // Delete the travel story from the database
      await TravelSchema.deleteOne({ _id: id, userid: userid });
  
      // Extract the filename from the imageUrl
      const imageUrl = user.imageUrl;
      const filename = path.basename(imageUrl);
      const filepath = path.join(__dirname, "../uploads", filename);
  
      // Delete the file
      fs.unlink(filepath, (err) => {
        if (err) {
          console.log("Failed to delete image file:", err);
        }
      });
  
      res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: true, message: error.message });
    }
  });
  
  app.put("/update-isFavorite/:id", isLoggedIn, async (req, res) => {
    const { isFavorite } = req.body;
    const { userid } = req.user;
    const { id } = req.params;

    try {
        const updateisfav = await TravelSchema.findOne({ _id: id, userid: userid });
        if (!updateisfav) {
            return res.status(404).json({ error: true, message: "Travel story not found" });
        }

        updateisfav.isFavorite = isFavorite;
        await updateisfav.save();

        res.status(200).json({ story: updateisfav, message: "isFavorite updated successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

// app.get("/search"  , isLoggedIn, async(req, res)=>{

//     const {query} = req.query ; 
//     const {userid} = req.user ; 

//     // This line extracts the search query from the URL query parameters.

// // Example URL:
// // http://localhost:5000/search?query=beach

// // Here:

// // query = beach
//     if(!query)
//     {
//         res.status(401).json({message:"No travel story found "});
//     }
//     try
//     {
//         const searchResult = await TravelSchema.find(
//             {
// //                 $or: It checks multiple fields at the same time.
// // $regex: This is used to search for a pattern (like beach) in the text.
// // $options: "i" makes the search case-insensitive.
// // Example:

// // "beach" will match "Beach" or "BEACH".

//                 userid:userid ,
//                 $or : [
//                     {title : {$regex:query , $options:"i"}},
//                     {story : {$regex:query , $options:"i"}},
//                     {visitedLocation : {$regex:query , $options:"i"}}
//                 ],
// //                 This sorts the search results in descending order:
// // -1: Favorite stories first.
// // 1: Non-favorite stories later.
//             }).sort({isFavorite:-1});
//             res.status(201).json({story:searchResult});
//     }
//     catch (error) {
//         res.status(500).json({ error: true, message: error.message });
//     }
// })

// app.get("/filterbydate", isLoggedIn, async (req, res) => {
//     const { startDate, endDate } = req.query;
//     const { userid } = req.user;

//     try {
//         const start = new Date(parseInt(startDate));  
//         const end = new Date(parseInt(endDate));      

//         const filterbydate = await TravelSchema.find({
//             userid: userid,
//             // GTE -> GREATER THEN OR EQUAL TO 
//             // LTE -> LESS THEN OR EQUAL TO 
//             visitedDate: { $gte: start, $lte: end }   // Filter by range
//         }).sort({ isFavorite: -1 });

//         if (filterbydate.length === 0) {
//             return res.status(401).json({ message: "No story found in this date range" });
//         }

//         res.status(201).json({ story: filterbydate });
//     }
//     catch (error) {
//         res.status(500).json({ error: true, message: error.message });
//     }
// });

// app.get("/filterbydate", isLoggedIn, async (req, res) => {
//     const { startDate, endDate } = req.query;
//     const { userid } = req.user;

//     try {
//         const start = new Date(parseInt(startDate));  
//         const end = new Date(parseInt(endDate));      

//         const filterbydate = await TravelSchema.find({
//             userid: userid,
//             visitedDate: { $gte: start, $lte: end }
//         }).sort({ isFavorite: -1 });

//         //  Use 200 instead of 401 when no stories are found
//         if (filterbydate.length === 0) {
//             return res.status(200).json({ story: [] });  // Return empty array instead of error
//         }

//         res.status(200).json({ story: filterbydate }); //  Use 200 OK instead of 201
//     }
//     catch (error) {
//         res.status(500).json({ error: true, message: error.message });
//     }
// });


app.get("/search"   , async(req, res)=>{

    const {query} = req.query ; 
    // const {userid} = req.user ; 

    // This line extracts the search query from the URL query parameters.

// Example URL:
// http://localhost:5000/search?query=beach

// Here:

// query = beach
    if(!query)
    {
        res.status(401).json({message:"No travel story found "});
    }
    try
    {
        const searchResult = await TravelSchema.find(
            {
//                 $or: It checks multiple fields at the same time.
// $regex: This is used to search for a pattern (like beach) in the text.
// $options: "i" makes the search case-insensitive.
// Example:

// "beach" will match "Beach" or "BEACH".

                // userid:userid ,
                $or : [
                    {title : {$regex:query , $options:"i"}},
                    {story : {$regex:query , $options:"i"}},
                    {visitedLocation : {$regex:query , $options:"i"}}
                ],
//                 This sorts the search results in descending order:
// -1: Favorite stories first.
// 1: Non-favorite stories later.
            }).sort({isFavorite:-1});
            res.status(201).json({story:searchResult});
    }
    catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
})



app.get("/filterbydate" , async (req, res) => {
    const { startDate, endDate } = req.query;
    // const { userid } = req.user;

    try {
        const start = new Date(parseInt(startDate));  
        const end = new Date(parseInt(endDate));      

        const filterbydate = await TravelSchema.find({
            // userid: userid,
            visitedDate: { $gte: start, $lte: end }
        }).sort({ isFavorite: -1 });

        //  Use 200 instead of 401 when no stories are found
        if (filterbydate.length === 0) {
            return res.status(200).json({ story: [] });  // Return empty array instead of error
        }

        res.status(200).json({ story: filterbydate }); //  Use 200 OK instead of 201
    }
    catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});


module.exports = app ;