const express = require("express")
const app = express();
const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use("/auth",authRoutes);
app.use("/post",postRoutes);

module.exports = app;