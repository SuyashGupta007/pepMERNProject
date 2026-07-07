const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.register = async (req,res)=>{
  try{

 const {username,email,password} = req.body;
 const existing = await userModel.findOne({email});
 if(existing){
 return res.status(400).json({message:"User already exists"})
 }
 const hashed = await bcrypt.hash(password,10);
  await userModel.create({username,email,password:hashed})
  res.json({success:true,message:"User registered successfully"})

  }catch(err){
    console.error(err.message)
  }
}

