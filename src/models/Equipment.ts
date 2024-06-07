import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { HeadsetModel } from './Headset';
import { KeyboardModel } from './Keyboard';
import { MouseModel } from './Mouse';
import { MousepadModel } from './Mousepad';

const headsetSchema = HeadsetModel.schema;
const keyboardSchema = KeyboardModel.schema;
const mouseSchema = MouseModel.schema;
const mousepadSchema = MousepadModel.schema;

const equipmentSchema = new Schema({
  headsets: [headsetSchema],
  keyboards: [keyboardSchema],
  mouses: [mouseSchema],
  mousepads: [mousepadSchema],
});

export const EquipmentModel = mongoose.model("Equipment", equipmentSchema);
