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
const logger=require("./middlewares/logger");
const {notFound,errorHandler}=require("./middlewares/errors");
const connectToDb = require("./config/db");
const path    = require("path");
const helmet    = require("helmet");
const cors    = require("cors");

// Initialize the Express application
const app = express();

// static folder
app.use(express.static(path.join(__dirname,"images")));


// Apply middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);
app.use(helmet());
//cors policy
app.use(cors());

//know ejs
app.set("view engine", "ejs")

// Define routes
app.use("/api/books",  require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use("/password", require("./routes/password"));

//Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
connectToDb();

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

