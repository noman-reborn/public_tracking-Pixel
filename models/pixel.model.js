const mongoose = require("mongoose");
const {
  defaultEventSchema,
} = require("../models/schemas/default.event.schema");
const {
  standardEventSchema,
} = require("../models/schemas/standard.events.schema");
const {
  cusotomEventSchema,
} = require("../models/schemas/custom.events.schema");
const User = require("../models/user.model");
const pixelSchema = new mongoose.Schema(
  {
    pixel_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },

    events: [
      {
        type: Object,
        enum: [defaultEventSchema, standardEventSchema, cusotomEventSchema],
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Pixel = mongoose.model("Pixel", pixelSchema);
module.exports = {
  Pixel,
};
