import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
  name: String,
  brand: String,
  slug: String,
  image: String,
}, { _id: false });

const playerSchema = new mongoose.Schema({
  firstName: 
  { 
    required: true, 
    type: String 
  },
  lastName: 
  { 
    required: true, 
    type: String 
  },
  nickName: 
  { 
    required: true, 
    type: String 
  },
  description: 
  { 
    required: true, 
    type: String 
  },
  nacionality: 
  { 
    required: true, 
    type: String 
  },
  age: { 
    required: true, 
    type: String 
  },
  role: 
  { required: true, 
    type: String 
  },
  image1: 
  { 
    required: true, 
    type: String 
  },
  image2: 
  { 
    required: true, 
    type: String 
  },
  slug: 
  { 
    required: true, 
    type: String 
  },
  equipment: {
    headset: equipmentSchema,
    keyboard: equipmentSchema,
    mouse: equipmentSchema,
    mousepad: equipmentSchema,
  },
});

export const PlayerModel = mongoose.model("Player", playerSchema);
