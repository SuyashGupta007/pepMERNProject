// Import User schema model module to access users database collection
const userModel = require("../models/user.model");
// Import bcryptjs utility module to hash and compare user passwords securely
const bcrypt = require("bcryptjs");
// Import JSON Web Token (JWT) module to generate session tokens
const jwt = require("jsonwebtoken") 

// Export user registration request handler function
exports.register = async (req,res)=>{
  // Start execution try-catch block to handle database or hashing failures
  try{

 // Destructure registration variables from JSON request body payload
 const {username,email,password} = req.body;
 // Run query searching for an existing database record with matching email address
 const existing = await userModel.findOne({email});
 // Check if match is found and return error early
 if(existing){
 // Send 400 Bad Request error stating email exists
 return res.status(400).json({message:"User already exists"})
 }
 // Hash raw password string with a secure salt work factor of 10
 const hashed = await bcrypt.hash(password,10);
  // Perform database insert operation creating new user record with hashed password
  await userModel.create({username,email,password:hashed})
  // Send 201 Created success JSON message to user client
  res.status(201).json({success:true,message:"User registered successfully"})

  // Capture processing errors that occur inside try execution block
  }catch(err){
    // Output error stack traces or messages directly to server logs
    console.error(err.message)
  }
}

// Export user authentication login session request handler
exports.login = async(req,res)=>{
  // Start try execution sequence to handle validation or processing errors
  try {
    // Destructure email and password credentials from login request body
    const{email,password} = req.body
    // Query users database table looking up email match
    const user = await userModel.findOne({email});
    // Check if matching email entry is absent from DB records
    if(!user){
        // Return 401 Unauthorized status representing login credentials rejection
        return res.status(401).json({message:"Invalid credentials"})
    }
    // Compare requested raw password against stored database hashed password string
    const match = await bcrypt.compare(password,user.password)
    // Check if comparison result does not match original hash structure
    if(!match){
         // Return 401 Unauthorized status representing login credentials rejection
         return res.status(401).json({message:"Invalid credentials"})
    }
    // Sign payload object containing user DB object ID using server secret key for 7 days
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
    // Assign JWT token into browser cookie named 'token' under restrictive security guidelines
    res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"strict",maxAge:24*60*60*1000})
    // Respond back to authentication client with 201 login success response containing token
    res.status(201).json({success:true,message:"Login successful",token})

  // Capture processing errors that occur inside try execution block
  } catch (err) {
     // Output error stack traces or messages directly to server logs
     console.error(err.message)
  }
}

// Export user logout session request handler
exports.logout = async(req,res)=>{
    // Delete session token cookie from request headers container
    res.clearCookie("token")
    // Respond with 200 HTTP status representing successful logout confirmation
    res.status(200).json({message:"Logout successful"})
}