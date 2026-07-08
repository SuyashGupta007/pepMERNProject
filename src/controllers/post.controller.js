const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const uploadFile = require("../services/storage.service");
exports.createPost = async(req , res)=>{
    try{
      if(!req.file)
        return res.status(400).json({message:"Image is required"})
       const result = await uploadFile(req.file.buffer);
       const post = await postModel.create({
        image:result.url,
        caption:req.body.caption,
        owner:req.userId
       })
       await userModel.findByIdAndUpdate(req.userId,{
        $push:{posts:post._id}
       });
       res.status(201).json({success:true,message:"Post created successfully",post});
    }catch(err){
        console.error(err.message)
        res.status(500).json({message:"Error creating post"})
    }
}
