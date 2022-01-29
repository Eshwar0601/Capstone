const mongoose = require("mongoose");
const User = require("./User");

const HealthParameterSchema = new mongoose.Schema({
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    temp: {
        type: Number,
        required: true,
    },
    hr: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("HealthParameter", HealthParameterSchema);
