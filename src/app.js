// Import the Express framework module
const express = require("express")
// Instantiate the Express application object
const app = express();
// Import the authentication routes handler module
const authRoutes = require("./routes/auth.routes")
// Import the post-related routes handler module
const postRoutes = require("./routes/post.routes")
// Import the cookie parser middleware to parse cookies from incoming requests
const cookieParser = require("cookie-parser")
// Enable JSON parsing middleware to read JSON-encoded request bodies
app.use(express.json());
// Register cookie parser middleware so req.cookies is populated
app.use(cookieParser());
// Enable middleware to parse incoming URL-encoded request bodies (form submissions)
app.use(express.urlencoded({extended:true}));
// Mount the authentication routing path under the "/auth" base URL
app.use("/auth",authRoutes);
// Mount the post-related routing path under the "/post" base URL
app.use("/post",postRoutes);

// Export the configured Express application instance for use in server entrypoint
module.exports = app;