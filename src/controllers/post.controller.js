// Import User schema model module to access users database collection
const userModel = require("../models/user.model");
// Import Post schema model module to access posts database collection
const postModel = require("../models/post.model");
// Import custom file uploading helper function wrapper (ImageKit helper)
const uploadFile = require("../services/storage.service");
// Export post creation action handler function
exports.createPost = async(req , res)=>{
    // Begin try execution block to handle image uploads and database updates safely
    try{
      // Check if file upload payload is missing from requests container
      if(!req.file)
        // Return 400 Bad Request error requesting image file upload parameter
        return res.status(400).json({message:"Image is required"})
       // Trigger ImageKit file upload api call and await returning result object
       const result = await uploadFile(req.file.buffer);
       // Perform database insert operation creating new post record
       const post = await postModel.create({
        // Set image path parameter to the generated image url location
        image:result.url,
        // Set caption parameter to text from the request body
        caption:req.body.caption,
        // Set owner property referencing current authenticated user id
        owner:req.userId
       })
       // Update User document by pushing the newly created post id into the posts references array
       await userModel.findByIdAndUpdate(req.userId,{
        // Push the new post object ID reference value
        $push:{posts:post._id}
       });
       // Return 201 Created success JSON message along with new post document properties
       res.status(201).json({success:true,message:"Post created successfully",post});
    // Capture execution failures that occur during uploading or database updates
    }catch(err){
        // Output failure error logs directly to server console
        console.error(err.message)
        // Return 500 Internal Server error status stating post creation process failed
        res.status(500).json({message:"Error creating post"})
    }
}
