const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");
const { verifyTokenAndAuthorize,verifyTokenAndAdmin } = require("../middlewares/verifyToken");

/**
 * @desc Update user
 * @route /api/users/:id
 * @method PUT
 * @access Private
 */

router.put("/:id", verifyTokenAndAuthorize, asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    console.log(req.headers)

    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,
            },
        },
        { new: true }
    ).select("-password");

    if (!updateUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updateUser);
}));



/**
 * @desc Get all users
 * @route /api/users/
 * @method Get
 * @access Private (only admin)
 */

router.get("/", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const users=await User.find().select("-password");
    res.status(200).json(users);
}));


/**
 * @desc Get user by id
 * @route /api/users/:id
 * @method Get
 * @access Private (only admin user himself)
 */

router.get("/:id", verifyTokenAndAuthorize, asyncHandler(async (req, res) => {
    const user=await User.findById(req.params.id).select("-password");
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message: "user not found"});
    }
}));


/**
 * @desc delete user
 * @route /api/users/:id
 * @method delete
 * @access Private (only admin user himself)
 */

router.delete("/:id", verifyTokenAndAuthorize, asyncHandler(async (req, res) => {
    const user=await User.findById(req.params.id).select("-password");
    if(user){
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "user has been deleted successfully"});
    }else{
        res.status(404).json({message: "user not found"});
    }
}));


module.exports = router;
