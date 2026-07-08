// Import Mongoose module to construct database schemas and models
const mongoose = require("mongoose")
// Define a database schema definition structure for Post documents
const postSchema = new mongoose.Schema({
    // Define image URL location path storage property as a String
    image:String,
    // Define caption description field property as a String
    caption:String,
    // Define owner field referencing a specific User document
    owner:{
        // Configure reference type as a MongoDB ObjectId
        type:mongoose.Schema.Types.ObjectId,
        // Specify the target model collection name ("User") to populate references
        ref:"User"
    }
})
// Instantiate a Mongoose model class object named "Post" mapping the post schema rules
const post = mongoose.model("Post",postSchema);
// Export the Post database model object to perform operations in other controllers
module.exports = post;