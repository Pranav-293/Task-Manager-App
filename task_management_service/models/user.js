const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique : true,
    },
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    username :{
        type: String,
        required: true,
    },
    password :{
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    level:{
        type: String,
        required:true,
    },
    orgId : {
        type: String,
        required: true,
    },
    reporting : {
        type: String,
        required: true,
    },
    createdBy : {
        type: String,
        required: true,
    },
    updatedBy : {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", userSchema);