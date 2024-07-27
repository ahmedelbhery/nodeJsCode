const express = require("express");
const router = express.Router();
const { verifyTokenAndAuthorize,verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");







router.get("/",getAllUsers);

router.route("/:id")
.put(verifyTokenAndAuthorize, updateUser)
.get( verifyTokenAndAuthorize, getUserById)
.delete(verifyTokenAndAuthorize,deleteUser);



module.exports = router;
