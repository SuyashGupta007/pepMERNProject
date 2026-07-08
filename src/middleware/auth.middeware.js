// Import JSON Web Token (JWT) module to verify authorization tokens
const jwt = require("jsonwebtoken")
// Export middleware function checking for authentication on protected routes
module.exports = (req,res,next) =>{
    // Retrieve the authorization token from the request cookies object
    const token = req.cookies.token;
    // If token is missing, return 401 Unauthorized status and short circuit the route
    if(!token) return res.status(401).json({message:"Unauthorized"});
    // Begin validation block to verify user authorization signature
    try{
        // Decode and verify token using the secret signature key
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // Inject verified user identifier payload directly into request context object
        req.userId = decoded._id;
        // Proceed control flow to the next middleware or request handler function
        next();
    // Catch validation error if the token has been tampered with or expired
    }catch(err){
        // Output the validation failure logs directly to the system console
        console.error(err.message);
        // Return 401 Unauthorized status representing authorization check failure
        return res.status(401).json({message:"Unauthorized"})
    } 
}
