const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken") 

exports.register = async (req,res)=>{
  try{

 const {username,email,password} = req.body;
 const existing = await userModel.findOne({email});
 if(existing){
 return res.status(400).json({message:"User already exists"})
 }
 const hashed = await bcrypt.hash(password,10);
  await userModel.create({username,email,password:hashed})
  res.status(201).json({success:true,message:"User registered successfully"})

  }catch(err){
    console.error(err.message)
  }
}

exports.login = async(req,res)=>{
  try {
    const{email,password} = req.body
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
         return res.status(401).json({message:"Invalid credentials"})
    }
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
    res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"strict",maxAge:24*60*60*1000})
    res.status(201).json({success:true,message:"Login successful",token})

  } catch (err) {
     console.error(err.message)
  }
}

exports.logout = async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"Logout successful"})
}