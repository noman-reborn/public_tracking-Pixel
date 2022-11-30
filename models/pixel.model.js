const mongoose = require("mongoose");
const {
  defaultEventSchema,
} = require("../models/schemas/default.event.schema");
const {
  standardEventSchema,
} = require("../models/schemas/standard.events.schema");
const { customEventSchema } = require("../models/schemas/custom.events.schema");
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
        enum: [defaultEventSchema, standardEventSchema, customEventSchema],
        required: true,
        unique: true,
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
