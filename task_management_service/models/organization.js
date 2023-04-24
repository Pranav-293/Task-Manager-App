const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("organization", orgSchema);
