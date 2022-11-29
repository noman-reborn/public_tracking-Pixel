const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    let bearerToken = authHeaders.split(" ")[1];

    if (!bearerToken) {
      return res
        .status(403)
        .json({ message: "A token is required for authentication" });
    }
    if (!authHeaders) {
      return res.status(403).json({
        message: "No credentials sent!",
      });
    }

    jwt.verify(bearerToken, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Token is invalid" });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "AN unhandled server exception occured" });
  }
};

module.exports = { verifyToken };
