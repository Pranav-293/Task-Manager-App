// Database configuration
const mongoose = require("mongoose");

// Connection details
const username = "";
const password = "";
const URL = "mongodb+srv://Pranav:Pranav1234@cluster0.w6wmya9.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(URL).catch((err) => {console.log(err.message);});

const db = mongoose.connection;

db.on("open", () => {console.log("Database connected");});