import mongoose from "mongoose";

const valorantSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});

export const ValorantModel = mongoose.model("VALORANT", valorantSchema);

