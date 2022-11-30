//requiring all the dependencies.

const { Pixel } = require("../models/pixel.model");
const { User } = require("../models/user.model");

//dashboard with all the past pixel user has created.
const dashboard = async (req, res, next) => {
  try {
    const pixels = await User.find({ _id: req.params.userId });
    if (pixels) {
      res.status(200).json({
        success: true,
        msg: "pixel has been created successfully",
        data: pixels,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No pixel created.",
      });
    }
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

//for admin only.
const admin = async (req, res, next) => {
  try {
    const pixels = await Pixel.find({});
    if (pixels) {
      res.status(200).json({
        success: true,
        data: pixels,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No pixel found.",
      });
    }
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};
//to create the pixel.

const createPixel = async (req, res, next) => {
  try {
    const newPixel = new Pixel(req.body);

    await newPixel.save();
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }

  res.status(200).json({
    success: true,
    msg: "New Pixel has been created successfully",
  });
};
//to update the pixel.
const updatePixel = async (req, res, next) => {
  try {
    const pixel = await Pixel.findOneAndUpdate(
      { _id: req.params.pixelId },
      { user_id: req.body.user_id },
      { $push: { events: req.body.events } }
    );
    if (pixel) {
      const updatedPixel = await pixel.save();
      res.status(200).json({
        success: true,
        msg: "Pixel has been updated",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Pixel not found",
      });
    }
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

const deletePixel = async (req, res, next) => {
  try {
    const pixel = await Pixel.findOneAndDelete(
      { _id: req.params.pixelId },
      (err, pixel) => {
        if (err) {
          const error = new Error(err);
          return next(error);
        } else {
          res.status(200).json({
            success: true,
            msg: "pixel has been removed successfully",
            data: pixel,
          });
        }
      }
    );
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

module.exports = {
  createPixel,
  dashboard,
  updatePixel,
  deletePixel,
  admin,
};
