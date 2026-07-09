// Import the Express framework module
const express = require("express");
// Create a new router instance from Express to define nested routes
const router = express.Router();
// Import Multer middleware module to handle file uploading formats
const multer = require("multer");
// Import authentication middleware module to protect the post routes
const authMiddleware = require("../middleware/auth.middeware");
// Import the post controller containing request processing actions
const postController = require("../controllers/post.controller");
// Instantiate Multer file uploader object using local memory storage engine
const upload = multer({
    // Keep file buffer in RAM memory instead of writing directly to disk storage
    storage: multer.memoryStorage(),
})
// Define post request router mapping the create-post endpoint
router.post(
    // Match route path url "/create-post"
    "/create-post",
    // Process user authentication authorization check middleware first
    authMiddleware,
    // Accept single uploaded file mapping from the request body property "image"
    upload.single("image"),
    // Forward parsed file buffer and caption body parameters to controller
    postController.createPost,
)


router.get("/get-posts",postController.getAllPosts);

router.get("/user-posts",authMiddleware,postController.getUserPosts
)

// Export router instance containing mounted post routes for use in principal application
module.exports = router;