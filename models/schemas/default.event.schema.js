const mongoose = require("mongoose");
const utmSchema = require("./utm.schema");
const Schema = mongoose.Schema;

const defaultEventSchema = new Schema(
  {
    website_id: {
      type: String,
      required: false,
      unique: false,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    event_data: {
      type: Object,
      required: false,
    },
    version: {
      type: Number,
      required: false,
      default: 1,
    },
    document_location: {
      type: String,
      required: true,
      default: null,
    },
    referrer_location: {
      type: String,
      required: false,
      default: null,
    },
    document_encoding: {
      type: String,
      required: false,
      default: null,
    },
    screen_resolution: {
      type: String,
      required: false,
      default: null,
    },
    viewport: {
      type: String,
      required: false,
      default: null,
    },
    color_depth: {
      type: Number,
      required: false,
      default: null,
    },
    document_title: {
      type: String,
      required: false,
      default: null,
    },
    browser_name: {
      type: String,
      required: false,
      default: null,
    },
    mobile_device: {
      type: String,
      required: false,
      default: null,
    },
    user_agent: {
      type: String,
      required: false,
      default: null,
    },
    timezone: {
      type: Number,
      required: false,
      default: null,
    },
    //utm stands for  Urchin Tracking Module
    utm: {
      type: utmSchema,
      required: false,
    },
    event_trigger: {
      type: String,
      required: false,
    },
    //any kind of optional data we can send with pixel.
    // optional_data: {
    //   type: String,
    //   required: false,
    // },
  },
  {
    timestamps: true,
  }
);
// const defaultEvent = mongoose.model("defaultEvent", defaultEventSchema);
module.exports = {
  defaultEventSchema,
};
