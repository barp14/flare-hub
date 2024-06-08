import { Body, Get, Delete, Put, Route, Tags } from "tsoa";
import { EquipmentModel } from "../models/Equipment";
import { JsonObject } from "swagger-ui-express";

@Route("api/Equipment")
@Tags("Equipment")
export default class EquipmentController {

  @Put("/addHeadset")
  public async addHeadset(@Body() body: { name: string, brand: string }): Promise<string> {
    try {
      let equipment = await EquipmentModel.findOne();
      if (!equipment) {
        equipment = new EquipmentModel({
          headsets: [],
          keyboards: [],
          mouses: [],
          mousepads: []
        });
      }
  
      equipment.headsets.push(body);
      await equipment.save();
  
      return "Headset added successfully";
    } catch (error: any) {
      console.error("Error adding headset: ", error);
      return error.message;
    }
  }
  
  @Put("/addKeyboard")
  public async addKeyboard(@Body() body: { name: string, brand: string }): Promise<string> {
    try {
      let equipment = await EquipmentModel.findOne();
      if (!equipment) {
        equipment = new EquipmentModel({
          headsets: [],
          keyboards: [],
          mouses: [],
          mousepads: []
        });
      }
  
      equipment.keyboards.push(body);
      await equipment.save();
  
      return "Keyboard added successfully";
    } catch (error: any) {
      console.error("Error adding keyboard: ", error);
      return error.message;
    }
  }

  @Put("/addMouse")
  public async addMouse(@Body() body: { name: string, brand: string }): Promise<string> {
    try {
      let equipment = await EquipmentModel.findOne();
      if (!equipment) {
        equipment = new EquipmentModel({
          headsets: [],
          keyboards: [],
          mouses: [],
          mousepads: []
        });
      }
  
      equipment.mouses.push(body);
      await equipment.save();
  
      return "Mouse added successfully";
    } catch (error: any) {
      console.error("Error adding mouse: ", error);
      return error.message;
    }
  }

  @Put("/addMousepad")
  public async addMousepad(@Body() body: { name: string, brand: string }): Promise<string> {
    try {
      let equipment = await EquipmentModel.findOne();
      if (!equipment) {
        equipment = new EquipmentModel({
          headsets: [],
          keyboards: [],
          mouses: [],
          mousepads: []
        });
      }
  
      equipment.mousepads.push(body);
      await equipment.save();
  
      return "Mousepad added successfully";
    } catch (error: any) {
      console.error("Error adding mousepad: ", error);
      return error.message;
    }
  }

  @Get("/getAll")
  public async all(): Promise<JsonObject> {
    try {
      const data = await EquipmentModel.find();
      return data;
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

    @Delete("/delete/:id")
    public async delete(id: string): Promise<JsonObject> {
      try {
        const data = await EquipmentModel.findByIdAndDelete(id)
        return { data: data };
      } catch (error: any) {
        return {
          error: error.message
        };
      }
    }
}
