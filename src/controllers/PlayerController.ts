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

      // Busca o tipo de equipamento específico
      let equipment: any;
      let equipmentType: string | undefined;

      const types = ['headsets', 'keyboards', 'mouses', 'mousepads'] as const;

      for (const type of types) {
        equipment = (equipmentDoc as any)[type].id(body._id);
        if (equipment) {
          equipmentType = type.slice(0, -1); // Remove o 's' do final para obter o tipo correto
          break;
        }
      }

      if (!equipment || !equipmentType) {
        return "Equipment not found";
      }

      console.log(`Found equipment of type: ${equipmentType}`, equipment);

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
      console.error("Error adding equipment to player:", error);
      return error.message;
    }
  }
}
