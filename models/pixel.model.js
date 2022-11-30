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
const { User } = require("../models/user.model");
const pixelSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },
    url: {
      type: String,
      required: true,
      unique: false,
    },

    events: [
      {
        type: Object,
        enum: [defaultEventSchema, standardEventSchema, cusotomEventSchema],
        required: true,
        unique: false,
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
