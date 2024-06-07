import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  nacionality: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: String,
  },
  role: {
    required: false,
    type: String,
  },
  equipment: {
    headsetId: {
      type: mongoose.Schema.Types.ObjectId, ref: "Headset"
    },
    keyboardId: {
      type: mongoose.Schema.Types.ObjectId, ref: "Keyboard"
    },
    mouseId: {
      type: mongoose.Schema.Types.ObjectId, ref: "Mouse"
    },
    mousepadId: {
      type: mongoose.Schema.Types.ObjectId, ref: "Mousepad"
    }
  },
});

export const PlayerModel = mongoose.model("Player", playerSchema);
