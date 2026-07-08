// Import the Express framework module
const express = require("express");
// Create a new router instance from Express to define nested routes
const router = express.Router();
// Import the authentication controllers module housing the handler functions
const authController = require("../controllers/auth.controller.js");
// Destructure register, login, and logout handler functions from authentication controller
const {register,login,logout} = authController;

// Register post request listener route mapping register endpoint to register function
router.post("/register",register); 
// Register post request listener route mapping login endpoint to login function
router.post("/login",login);
// Register post request listener route mapping logout endpoint to logout function
router.post("/logout",logout);

// Export router instance containing mounted auth routes for use in principal application
module.exports = router;