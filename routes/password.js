const express=require("express");
const router=express.Router();
const { getForgotPasswordView, sendForgotPasswordLink, getResetPasswordView, resetThePassword } = require("../controllers/passwordController");

// /password/forgot-password
router.route("/forgot-password")
.get(getForgotPasswordView)
.post(sendForgotPasswordLink);



// /password/reset-password/:userId
router.route("/reset-password/:userId/:token")
.get(getResetPasswordView)
.post(resetThePassword);
module.exports=router;