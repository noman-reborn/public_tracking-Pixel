const mongoose = require("mongoose");
const Pixel = require("../pixel.model");

const Schema = mongoose.Schema;

const dashboardSchema = new Schema({
  pixel_name: {
    type: String,
    required: true,
  },
  pixel_id: {
    type: mongoose.Types.ObjectId,
    ref: Pixel,
    required: true,
  },
  web_url: {
    type: String,
    required: true,
  },
  Business_category: {
    type: String,
    required: true,
  },
  // All the events which user has previously Used.
  Event_labels: {
    type: Array,
    required: true,
  },
});
module.exports = {
  dashboardSchema,
};
