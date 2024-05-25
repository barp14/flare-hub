import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    }   
})

export const EquipmentModel = mongoose.model("Equipment", equipmentSchema)