import mongoose from "mongoose";

const playerSchema =new mongoose.Schema({
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
    headset: {
        type: mongoose.Schema.Types.ObjectId, ref: "Equipment"
    },
    keyboard: {
        type: mongoose.Schema.Types.ObjectId, ref: "Equipment"
    },
    mouse: {
        type: mongoose.Schema.Types.ObjectId, ref: "Equipment"
    },
    mousepad: {
        type: mongoose.Schema.Types.ObjectId, ref: "Equipment"
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Game"
    }
})

export const PlayerModel = mongoose.model("Player", playerSchema)
