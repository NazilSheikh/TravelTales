const mongoose = require('mongoose') ;

const TravelSchema = mongoose.Schema({
   title:{type: String , required: true } ,
   story:{type: String , required: true} ,
   visitedLocation: {type: [String] , default: []} ,
   isFavorite : {type: Boolean , default: false} ,
   userid : { type: mongoose.Schema.Types.ObjectId , ref: "User" , required: true },
   createdOn: {type: Date , default:Date.now} ,
   imageUrl: {type: String , required: true} ,
   visitedDate: {type: Date , required: true} ,
    name: { type: String, required: true },  // add name field
    email: { type: String, required: true }
})
module.exports = mongoose.model("Travelstory" , TravelSchema);
