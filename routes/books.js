const express = require("express");
const router = express.Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// /api/books
router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, createBook);

// /api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBook);

module.exports = router;




    //Comparison Query Operators
    //$eq  => (equal)     
    //$ne  => (not equal)
    //$lt  => less than
    //$lte => less than and equal
    //$gt  => greater than
    //$gte => greater than and equal
    //$in  => each price eqal 8 or 10 
    //$nin  => each price not eqal 8 or 10 