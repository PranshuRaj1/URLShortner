import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  timeStamp: {
    type: Number,
    default: Date.now,
  },
});

const urlSchema = new mongoose.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    History: [historySchema],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

export default URL;
