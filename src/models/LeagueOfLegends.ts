import mongoose from "mongoose";

const leagueoflegendsSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});

export const LeagueOfLegendsModel = mongoose.model("League of Legends", leagueoflegendsSchema);
