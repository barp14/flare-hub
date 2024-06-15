import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
}); ({ _id: false });

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
  },
  image1: {
    required: true,
    type: String,
  },
  image2: {
    required: true,
    type: String,
  },
  players: [playerSchema]  // Array de jogadores
});

export const TeamModel = mongoose.model("Team", TeamSchema);
