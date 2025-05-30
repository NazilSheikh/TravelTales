const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // DESTINATION folder to upload file ;
    destination:function(req , file , cb)
    {
        cb(null , "./uploads") ;
    } ,
    // unique filename upload ;
    filename: function(req , file , cb)
    {
        cb(null , Date.now() + path.extname(file.originalname) );
    },
}) ;

// file filter to accept only image as file .
const fileFilter = (req ,file , cb) =>{
 if(file.mimetype.startsWith("image/"))
 {
    cb(null , true) ;
 }
 else
 {
    cb(new Error("Only images are allowed") , false);
 }
} ;
// Initialise multer instance ;
const upload = multer({storage, fileFilter}) ;

module.exports = upload; 


