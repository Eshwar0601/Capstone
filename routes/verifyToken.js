const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
        return res
            .status(401)
            .send({ error: "Authentication credentials were not provided." });
    }
    try {
        const verified = jwt.verify(token, "PotatoInYourASS");
        req.user = verified;
        next();
    } catch (err) {
        res.send(400).send({ error: "Invalid Token" });
    }
};
