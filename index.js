const express = require("express");
const authRouter = require("./routes/auth");
const app = express();
const mongoose = require("mongoose");
const postRoute = require("./routes/posts");

DB_URL = "mongodb://localhost:27017/Capstone";
mongoose.connect(DB_URL, { useNewUrlParser: true }, () => {
    console.log("Connected to DB!");
});

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use("/api/user", authRouter);
app.use("/api/posts", postRoute);

app.listen(8080, () => {
    console.log("Server Running ....");
});
