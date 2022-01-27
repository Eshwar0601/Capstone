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
app.use("/api/user", authRouter);
app.use("/api/posts", postRoute);

app.listen(8080, () => {
    console.log("Server Running ....");
});
