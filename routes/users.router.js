const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authenticate.middleware");

const {
  loginUser,
  signupUser,
  logoutUser,
} = require("../controllers/users.controlers");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/logout", verifyToken, logoutUser);

module.exports = router;
