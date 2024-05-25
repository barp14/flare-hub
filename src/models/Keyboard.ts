import mongoose from "mongoose";

const keyboardSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  brand: {
    required: true,
    type: String,
  },
})

export const KeyboardModel = mongoose.model("Keyboard", keyboardSchema)
