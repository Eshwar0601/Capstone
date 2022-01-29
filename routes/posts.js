const router = require("express").Router();
const HealthParameter = require("../model/HealthParameter");
const verify = require("./verifyToken");

router.get("/", verify, async (req, res) => {
    const userHealthData = await HealthParameter.find({ user: req.user })
        .then((data) => res.send({ userData: data }))
        .catch((err) => res.send(err));
    // res.send({ detail: req.user });
});

router.post("/", verify, async (req, res) => {
    const healthData = new HealthParameter({
        user: req.user,
        temp: req.body.temp,
        hr: req.body.hr,
    });
    try {
        const savedTempData = await healthData.save();
        res.status(201).send(savedTempData);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
