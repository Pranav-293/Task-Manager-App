// Database configuration
const mongoose = require("mongoose");

// Connection details
const username = "";
const password = "";
const URL = "";

mongoose.connect(URL).catch((err) => {console.log(err.message);});

const db = mongoose.connection;

db.on("open", () => {console.log("Database connected");});