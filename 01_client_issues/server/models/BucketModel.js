const mongoose = require("mongoose");
// Blueprints
// 1) Schema - id, description, isComplete
let bucketListSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Tom broke it!"],
    maxLength: 30,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

// 2) Model
exports.BucketModel = new mongoose.model("bucketlists", bucketListSchema)
