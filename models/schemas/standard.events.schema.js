const mongoose = require("mongoose");

const standardEventSchema = new mongoose.Schema({
  event_label: {
    type: String,
    required: true,
    trim: true,
  },
  values: {
    content_ids: {
      type: Array,
      required: false,
    },
    content_category: {
      type: String,
      required: true,
      default: "",
    },
    content_name: {
      type: String,
      required: true,
    },
    contents: {
      type: Array,
      default: [],
      required: true,
    },
    content_type: {
      type: String,
      required: false,
    },
    currency: {
      type: String,
      required: true,
    },
    num_items: {
      type: Number,
      default: 0,
      required: true,
    },

    value: {
      type: Number,
      required: true,
      default: 0,
    },
  },
});
// const standardEvent = mongoose.model("standardEvent", standardEventSchema);
module.exports = {
  standardEventSchema,
};
