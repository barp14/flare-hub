import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    }
})

export const GameModel = mongoose.model("Game", gameSchema)