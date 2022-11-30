const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customEventSchema = new Schema({
  event_name: {
    type: String,
    required: true,
  },
  values: {
    type: Object,
    required: true,
  },
});
module.exports = {
  customEventSchema,
};
