import { Put, Body, Get, Patch, Delete, Post, Route, Tags } from "tsoa";
import { PlayerModel } from "../models/Player";
import { EquipmentModel } from "../models/Equipment";
import { JsonObject } from "swagger-ui-express";

@Route("api/Player")
@Tags("Player")
export default class PlayerController {
  @Post("/create")
  public async create(@Body() body: { firstName: string; lastName: string; nickName: string; description: string; nacionality: string; age: string; role: string; image1: string; image2: string; slug: string }): Promise<string> {
    const data = new PlayerModel({
      firstName: body.firstName,
      lastName: body.lastName,
      nickName: body.nickName,
      description: body.description,
      nacionality: body.nacionality,
      age: body.age,
      role: body.role,
      image1: body.image1,
      image2: body.image2,
      slug: body.slug,
    })
    try {
      await data.save()
      return "OK"
    } catch (error) {
      return JSON.stringify(error)
    }
  }

  @Get("/getAll")
  public async all(): Promise<JsonObject> {
    try {
      const data = await PlayerModel.find();
      return data;
    }
    catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Get("/get/:id")
  public async get(id: string): Promise<JsonObject> {
    try {
      const data = await PlayerModel.findById(id);
      if (!data) {
        throw new Error('Not Found'); 
      }
      return { data: data };
    } catch (error) {
      console.error(error);
      return { error: 'Resource not found' }; 
    }
  }

  @Get("/slug/{slug}")
  public async getBySlug(slug: string): Promise<JsonObject> {
    try {
      const data = await PlayerModel.findOne({ slug: slug });
      if (!data) {
        throw new Error('Not Found');
      }
      return { data: data };
    } catch (error) {
      console.error(error);
      return { error: 'Resource not found' };
    }
  }

  @Patch("/update")
  public async update(@Body() body: { id: string; firstName: string; lastName: string; nickName: string;description: string; nacionality: string; age: string; role: string; image1: string; image2: string; }): Promise<JsonObject> {
    try {
      const result = await PlayerModel.findByIdAndUpdate(
        body.id, { firstName: body.firstName, lastName: body.lastName, nickName: body.nickName, description: body.description, nacionality: body.nacionality, age: body.age, role: body.role, image1: body.image1, image2: body.image2 }
      )
      return { result: result };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Delete("/delete/:id")
  public async delete(id: string): Promise<JsonObject> {
    try {
      const data = await PlayerModel.findByIdAndDelete(id)
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Put("/addEquipment/{playerId}")
  public async addEquipment(playerId: string, @Body() body: { _id: string }): Promise<string> {
    try {
      const player = await PlayerModel.findById(playerId);
      if (!player) {
        return "Player not found";
      }

      // Verifica se a propriedade 'equipment' está definida
      if (!player.equipment) {
        player.equipment = {
          headsetId: null,
          keyboardId: null,
          mouseId: null,
          mousepadId: null
        };
      }

      // Busca o equipamento pelo ID fornecido
      const equipmentDoc = await EquipmentModel.findOne({
        $or: [
          { "headsets._id": body._id },
          { "keyboards._id": body._id },
          { "mouses._id": body._id },
          { "mousepads._id": body._id }
        ]
      });
      if (!equipmentDoc) {
        return "Equipment not found";
      }
      
      // Procura dentro de cada array se algum "_id" corresponde ao "body._id", em caso positivo define o equipmentType de acordo com o "_id" correspondente
      let equipmentType = null;
      if (equipmentDoc.headsets.some(headset => headset._id?.toString() === body._id)) {
        equipmentType = "headset";
      } else if (equipmentDoc.keyboards.some(keyboard => keyboard?._id?.toString() === body._id)) {
        equipmentType = "keyboard";
      } else if (equipmentDoc.mouses.some(mouse => mouse._id?.toString() === body._id)) {
        equipmentType = "mouse";
      } else if (equipmentDoc.mousepads.some(mousepad => mousepad._id?.toString() === body._id)) {
        equipmentType = "mousepad";
      } else {
        return "Invalid equipment type";
      }
      
      // Associa o equipamento ao jogador
      const mongoose = require('mongoose');
      const { ObjectId } = mongoose.Types;
      const equipmentId = new ObjectId(body._id);

      switch (equipmentType) {
        case "headset":
          player.equipment.headsetId = equipmentId;
          break;
        case "keyboard":
          player.equipment.keyboardId = equipmentId;
          break;
        case "mouse":
          player.equipment.mouseId = equipmentId;
          break;
        case "mousepad":
          player.equipment.mousepadId = equipmentId;
          break;
        default:
          return "Invalid equipment type";
      }

      // Salva as alterações no documento do jogador
      await player.save();
      return "Equipment added to player successfully";
    } catch (error: any) {
      console.error("Error adding equipment to player:", error);
      return error.message;
    }
  }
}
