import mongoose from "mongoose";

const counterstrike2Schema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  }
});

export const CounterStrike2Model = mongoose.model("Counter-Strike 2", counterstrike2Schema);

