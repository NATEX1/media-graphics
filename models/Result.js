const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["pretest", "posttest"],
    },
    section: {
      type: Number,
    },
    response: {
      type: Array,
      default: [],
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
