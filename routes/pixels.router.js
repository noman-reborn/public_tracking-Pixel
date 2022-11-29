const express = require("express");
const pixelRouter = express.Router();
const {
  createPixel,
  dashboard,
  updatePixel,
  deletePixel,
} = require("../controllers/pixel.controllers.js");
const { verifyToken } = require("../middlewares/authenticate.middleware.js");

pixelRouter.get("/", dashboard);
pixelRouter.post("/create", verifyToken, createPixel);
pixelRouter.patch("/update/:pixelId", updatePixel);
pixelRouter.post("/delete", verifyToken, deletePixel);
module.exports = pixelRouter;
