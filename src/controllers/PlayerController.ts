import { Put, Body, Get, Patch, Delete, Post, Route, Tags } from "tsoa";
import { PlayerModel } from "../models/Player";
import { EquipmentModel } from "../models/Equipment";
import { JsonObject } from "swagger-ui-express";

@Route("api/Player")
@Tags("Player")
export default class PlayerController {
  @Post("/create")
  public async create(@Body() body: { name: string; description: string; nacionality: string; age: string; role: string;  }): Promise<string> {
    const data = new PlayerModel({
      name: body.name,
      description: body.description,
      nacionality: body.nacionality,
      age: body.age,
      role: body.role,
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

  @Patch("/update")
  public async update(@Body() body: { id: string; name: string; description: string; nacionality: string; age: string; role: string; }): Promise<JsonObject> {
    try {
      const result = await PlayerModel.findByIdAndUpdate(
        body.id, { name: body.name, description: body.description, nacionality: body.nacionality, age: body.age, role: body.role }
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
  
      // Verifica se 'player.equipment' não é nulo ou indefinido antes de acessar suas propriedades
      if (!player.equipment) {
        player.equipment = {};
      }

      // Busca o equipamento pelo ID fornecido
      const equipment = await EquipmentModel.findById(body._id);
      if (!equipment) {
        return "Equipment not found";
      }

      // Verifica o tipo de equipamento com base nas propriedades
      let equipmentType: string;
      if (equipment.headsets && equipment.headsets.length > 0) {
        equipmentType = "headset";
      } else if (equipment.keyboards && equipment.keyboards.length > 0) {
        equipmentType = "keyboard";
      } else if (equipment.mouses && equipment.mouses.length > 0) {
        equipmentType = "mouse";
      } else if (equipment.mousepads && equipment.mousepads.length > 0) {
        equipmentType = "mousepad";
      } else {
        return "Invalid equipment type";
      }

      // Associa o equipamento ao jogador
      switch (equipmentType) {
        case "headset":
          player.equipment.headsetId = equipment._id;
          break;
        case "keyboard":
          player.equipment.keyboardId = equipment._id;
          break;
        case "mouse":
          player.equipment.mouseId = equipment._id;
          break;
        case "mousepad":
          player.equipment.mousepadId = equipment._id;
          break;
        default:
          return "Invalid equipment type";
      }
  
      // Salva as alterações no documento do jogador
      await player.save();
      return "Equipment added to player successfully";
    } catch (error: any) {
      return error.message;
    }
  }
}
