const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const {register,login,logout} = authController;

router.post("/register",register); 