const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 4,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);
