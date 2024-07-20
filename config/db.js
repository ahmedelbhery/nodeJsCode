const mongoose = require("mongoose");


async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(error => console.log("Connection failed to MongoDB...", error));
}

module.exports=connectToDb;