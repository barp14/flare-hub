import mongoose from "mongoose";

const headsetSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  brand: {
    required: true,
    type: String,
  },
});

export const HeadsetModel = mongoose.model("Headset", headsetSchema);

