const { Book } = require("./models/Book");
const { Author } = require("./models/Author");
const { books ,authors} = require("./data");
const connectToDb = require("./config/db");
require("dotenv").config();

//connect to db
connectToDb();

// Import Books (seeding database)
const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log("Books Imported");
    } catch (error) {
        console.log(error);
        process.exit(1); //يقطع الاتصال ب db
    }
}

// Import Authors (seeding database)
const importAuthors = async () => {
    try {
        await Author.insertMany(authors);
        console.log("Authors Imported");
    } catch (error) {
        console.log(error);
        process.exit(1); //يقطع الاتصال ب db
    }
}

//remove books
const removeBooks=async () => {
    try {
        await Book.deleteMany();
        console.log("books removed");
    } catch (error) {
        console.log(error);
        process.exit(1); //يقطع الاتصال ب db
    }
}


if(process.argv[2] === "-import"){
    importBooks();
}else if(process.argv[2] === "-remove"){
    removeBooks();
} else if (process.argv[2] === "-import-authors") {
    importAuthors();
}
