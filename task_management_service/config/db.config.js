const mongoose = require("mongoose");
const username = "Pranav";
const password = "Pranav1234";
const URL = `mongodb+srv://${username}:${password}@cluster0.w6wmya9.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(URL).catch((err) => {console.log(err.message);});

const db = mongoose.connection;

db.on("open", () => {console.log("Database connected");});