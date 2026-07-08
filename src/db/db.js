// Import the Mongoose ORM library to interact with MongoDB database
const mongoose = require("mongoose")
// Define an asynchronous function to handle database connection setup
const connectDB = async ()=>{
    // Begin a try block to handle potential connection errors gracefully
    try{
        // Await the connection to MongoDB using the URI stored in environment variables
        await mongoose.connect(process.env.MONGODB_URI)
        // Log a success message to the console once connection is established
        console.log("Database connected")
    }
    // Catch block to capture and print any errors during the connection process
    catch(err){
        // Output the specific error message to the standard error console
        console.error(err.message)
    }
}
// Export the connection helper function to be utilized in main server configuration
module.exports = connectDB;