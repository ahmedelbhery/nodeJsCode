/*................core module....................*/
// const http=require("http");

// const books=[
//     {
//         id: 1,
//         name: "book 1",
//     },
//     {
//         id: 2,
//         name: "book 2",
//     },
// ]
// const server=http.createServer((req,res)=>{
//     if(req.url === "/"){
//         res.write("<h1>Welcome to node js</h1>");
//         res.end();
//     }
//     if(req.url === "/api/books"){
//         res.write(JSON.stringify(books));
//         res.end();
//     }
// });

// const port=5000;
// server.listen(port,()=>console.log(`server is running on port ${port}`));


//========================================================================

// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Import required modules
const express = require("express");
const booksPath = require("./routes/books");
const authorPath = require("./routes/authors");
const authPath = require("./routes/auth");
const usersPath = require("./routes/users");
const logger=require("./middlewares/logger");
const {notFound,errorHandler}=require("./middlewares/errors");
const connectToDb = require("./config/db");

// Initialize the Express application
const app = express();

// Apply middlewares
app.use(express.json());

app.use(logger)

// Define routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorPath);
app.use("/api/auth", authPath);
app.use("/api/users", usersPath);

//Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
connectToDb();

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

