const Joi = require("joi");
const mongoose=require("mongoose");
const AuthorSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 40,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 40,
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 60,
    },
    image: {
        type: String,
        default: "default-avater.png",
    },
},{
    timestamps: true, //give to database time and update
});


const Author = mongoose.model("Author",AuthorSchema);

function validateCreateAuthor(obj){
    const schema=Joi.object({
        firstName: Joi.string().min(3).max(40).required(),
        lastName: Joi.string().min(3).max(40).required(),
        nationality: Joi.string().min(2).max(60).required(),
        image: Joi.string(),
    })

    return schema.validate(obj);
}

function validateUpdateAuthor(obj){
    const schema=Joi.object({
        firstName: Joi.string().min(3).max(40),
        lastName: Joi.string().min(3).max(40),
        nationality: Joi.string().min(3).max(40),
        image: Joi.string().min(3).max(40),
    })

    return schema.validate(obj);
}

module.exports={
    Author,
    validateCreateAuthor,
    validateUpdateAuthor,
}