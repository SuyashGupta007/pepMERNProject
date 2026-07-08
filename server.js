// Import and load environment variables from the .env file into process.env
const dotenv = require("dotenv").config();
// Import the pre-configured Express application module
const app = require("./src/app")
// Import the database connection utility function
const connectDB = require("./src/db/db");
// Execute the database connection helper to establish connection with MongoDB
connectDB();

// Start the Express server and make it listen on the specified port from environment variables
app.listen(process.env.PORT,()=>{
    // Output a message to the console confirming the server is online and running
    console.log(`Server is running on port ${process.env.PORT}`)
})

