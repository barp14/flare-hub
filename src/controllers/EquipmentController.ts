import { Body, Get, Delete, Put, Route, Tags } from "tsoa";
import { EquipmentModel } from "../models/Equipment";
import { JsonObject } from "swagger-ui-express";
import { Param } from "routing-controllers";

@Route("api/Equipment")
@Tags("Equipment")
export default class EquipmentController {

  @Put("/addHeadset")
  public async addHeadset(@Body() body: { name: string, brand: string, slug: string }): Promise<string> {
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
  public async addKeyboard(@Body() body: { name: string, brand: string, slug: string }): Promise<string> {
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
  public async addMouse(@Body() body: { name: string, brand: string, slug: string }): Promise<string> {
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
  public async addMousepad(@Body() body: { name: string, brand: string, slug: string }): Promise<string> {
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

  @Get('/getBySlug/:slug')
  public async getBySlug(@Param('slug') slug: string): Promise<any> {
    console.log(`Searching for equipment with slug: ${slug}`);
    try {
      const equipment = await EquipmentModel.findOne({
        $or: [
          { 'headsets.slug': slug },
          { 'keyboards.slug': slug },
          { 'mouses.slug': slug },
          { 'mousepads.slug': slug }
        ]
      }).exec();

      if (!equipment) {
        console.log('Equipment not found');
        return { error: true, message: 'Equipment not found' };
      }

      // Encontrar o equipamento específico no array
      let foundEquipment = null;

      // TypeScript pode reclamar que o tipo não pode ser indexado por string diretamente
      // Vamos garantir que o tipo seja corretamente reconhecido
      for (const type of ['headsets', 'keyboards', 'mouses', 'mousepads'] as const) {
        const items = (equipment as any)[type];
        const item = items.find((item: any) => item.slug === slug);
        if (item) {
          foundEquipment = item;
          break;
        }
      }

      if (!foundEquipment) {
        console.log('Equipment with the specified slug not found in arrays');
        return { error: true, message: 'Equipment not found in arrays' };
      }

      console.log('Equipment found:', foundEquipment);
      return { data: foundEquipment };
    } catch (error: any) {
      console.error('Error:', error);
      return { error: true, message: error.message };
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
