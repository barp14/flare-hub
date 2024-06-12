import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  teamType: {
    required: true,
    type: String,
  }
});

export const TeamModel = mongoose.model("Team", TeamSchema);
