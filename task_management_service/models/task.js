const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique : true,
    },
    name: {
        type: String,
        required: true,
    },
    detail : {
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
    status :{
        type: String,
        required: true,
    },
    userId : {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("task", taskSchema);