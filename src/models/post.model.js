const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
const post = mongoose.model("Post",postSchema);
module.exports = post;