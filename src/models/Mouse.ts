import mongoose from "mongoose";

const mouseSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  brand: {
    required: true,
    type: String,
  },
})

export const MouseModel = mongoose.model("Mouse", mouseSchema)
