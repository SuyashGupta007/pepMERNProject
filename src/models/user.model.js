// Import Mongoose module to construct database schemas and models
const mongoose = require("mongoose")
// Define a new database schema definition structure for User documents
const userSchema = new mongoose.Schema({
  // Define username property constraints as a required string
  username:{type:String, required:true},  
  // Define email property constraints as a required, unique string to prevent duplicates
  email:{type:String, required:true, unique:true},
  // Define password property constraints as a required string storage
  password:{type:String, required:true},
  // Define posts field as an array containing references to Post documents
  posts:[{
    // Configure each reference type as a MongoDB ObjectId
    type:mongoose.Schema.Types.ObjectId,
    // Specify the target model collection name ("Post") to populate references
    ref:"Post"
  }]
  
})

// Instantiate a Mongoose model class object named "User" mapping the user schema rules
const user = mongoose.model("User",userSchema)
// Export the User database model object to perform operations in other controllers
module.exports=user;