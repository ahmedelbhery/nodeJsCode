const express=require("express");
const router=express.Router();
const asyncHandler = require("express-async-handler");
const {verifyTokenAndAdmin }=require("../middlewares/verifyToken");
const { Author,validateCreateAuthor,validateUpdateAuthor }=require("../models/Author");



/**
* @desc Get all authors
* @route /api/author
* @method Get
* @access public
*/
router.get("/",asyncHandler(
    async(req,res)=>{
        const authorList=await Author.find().sort({firstName: 1}).select("firstName lastName ");//sort mean الحرف الابجدي
        res.status(200).json(authorList);}
))
/**
* @desc Get author by id
* @route /api/author/:id
* @method Get
* @access public
*/
router.get("/:id",async(req,res)=>{
    // const author=authors.find(b => b.id === parseInt(req.params.id))
    try{
        const author=await Author.findById(req.params.id);
        if(author){
            res.status(200).json(author);
        }else{
            res.status(404).json({message: "author not found"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message: "someThing went wrong"});
    }
})
/**
* @desc create new author
* @route /api/author
* @method Post
* @access private (only admin)
*/
router.post("/",verifyTokenAndAdmin,async(req,res)=>{
    const {error}=validateCreateAuthor(req.body);
    if(error){
        res.status(400).json({message: error.details[0].message});
    }
    try{
        const author=new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image,
        })
        const result=await author.save();
        res.status(201).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
})
/**
* @desc update author
* @route /api/author/:id
* @method Put
* @access private (only admin)
*/
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    const {error}=validateUpdateAuthor(req.body);
    if(error){
        res.status(400).json({message: error.details[0].message});
    }
    // const author=authors.find(b => b.id === parseInt(req.params.id))
    // if(author){
    //     res.status(200).json({message: "author has been updated"});
    // }else{
    //     res.status(404).json({message: "author not found"});
    // }
    try{
        const author=await Author.findByIdAndUpdate(req.params.id,{
            /*do update */$set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image,
            }
        },{new: true}/*show edit in postman */);
        res.status(200).json(author);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
})
/**
* @desc delete author
* @route /api/author/:id
* @method Delete
* @access private (only admin)
*/
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    // const author=authors.find(b => b.id === parseInt(req.params.id))
    const author = await Author.findByIdAndDelete(req.params.id)
    try{
        if(author){
            await Author.findByIdAndDelete(req.params.id)
            res.status(200).json({message: "author has been deleted"});
        }else{
            res.status(404).json({message: "author not found"});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
})




module.exports=router;