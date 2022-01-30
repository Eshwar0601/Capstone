const router = require("express").Router();
const { request } = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res
            .status(400)
            .send({ error: "User with this Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send({ error: "Incorrect Email Address." });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ _id: user._id }, "PotatoInYourASS");
    res.header("auth-token", token).send(token);
});

module.exports = router;
