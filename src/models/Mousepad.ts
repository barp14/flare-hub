import mongoose from "mongoose";

const mousepadSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  brand: {
    required: true,
    type: String,
  },
  slug: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  }
})

export const MousepadModel = mongoose.model("Mousepad", mousepadSchema)
