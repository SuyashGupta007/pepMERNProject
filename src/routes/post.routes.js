const express = require("express");
const router = express.Router();
const multer = require("multer");
const authMiddleware = require("../middleware/auth.middeware");
const postController = require("../controllers/post.controller");
const upload = multer({
    storage: multer.memoryStorage(),
})
router.post(
    "/create-post",
    authMiddleware,
    upload.single("image"),
    postController.createPost,
)

module.exports = router;