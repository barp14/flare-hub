import mongoose from "mongoose";
import { Put, Body, Get, Patch, Delete, Post, Route, Path, Tags } from "tsoa";
import { PlayerModel } from "../models/Player"
import { HeadsetModel } from "../models/Headset"
import { KeyboardModel } from "../models/Keyboard"
import { MouseModel } from "../models/Mouse"
import { MousepadModel } from "../models/Mousepad"
import { JsonObject } from "swagger-ui-express"

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

  @Put("/addHeadset/:playerId")
  public async addHeadsetToPlayer(
    @Path("playerId") playerId: string,
    @Body() body: { headsetId: string }
  ): Promise<JsonObject> {
    try {
      const player = await PlayerModel.findById(playerId);
      if (!player) {
        return { error: "Player not found" };
      }

      const headset = await HeadsetModel.findById(body.headsetId);
      if (!headset) {
        return { error: "Headset not found" };
      }

      player.headsetId = new mongoose.Types.ObjectId(body.headsetId);
      await player.save();

      return { message: "Headset added to player successfully", player };
    }
    catch (error: any) {
      return { error: error.message };
    }
  }

  @Put("/addKeyboard/:playerId")
  public async addKeyboardToPlayer(
    @Path("playerId") playerId: string,
    @Body() body: { keyboardId: string }
  ): Promise<JsonObject> {
    try {
      const player = await PlayerModel.findById(playerId);
      if (!player) {
        return { error: "Player not found" };
      }

      const keyboard = await KeyboardModel.findById(body.keyboardId);
      if (!keyboard) {
        return { error: "Keyboard not found" };
      }

      player.keyboardId = new mongoose.Types.ObjectId(body.keyboardId);
      await player.save();

      return { message: "Keyboard added to player successfully", player };
    }
    catch (error: any) {
      return { error: error.message };
    }
  }

  @Put("/addMouse/:playerId")
  public async addMouseToPlayer(
    @Path("playerId") playerId: string,
    @Body() body: { mouseId: string }
  ): Promise<JsonObject> {
    try {
      const player = await PlayerModel.findById(playerId);
      if (!player) {
        return { error: "Player not found" };
      }

      const mouse = await MouseModel.findById(body.mouseId);
      if (!mouse) {
        return { error: "Mouse not found" };
      }

      player.mouseId = new mongoose.Types.ObjectId(body.mouseId);
      await player.save();

      return { message: "Mouse added to player successfully", player };
    }
    catch (error: any) {
      return { error: error.message };
    }
  }

  @Put("/addMousepad/:playerId")
  public async addMousepadToPlayer(
    @Path("playerId") playerId: string,
    @Body() body: { mousepadId: string }
  ): Promise<JsonObject> {
    try {
      const player = await PlayerModel.findById(playerId);
      if (!player) {
        return { error: "Player not found" };
      }

      const mousepad = await MousepadModel.findById(body.mousepadId);
      if (!mousepad) {
        return { error: "Mousepad not found" };
      }

      player.mousepadId = new mongoose.Types.ObjectId(body.mousepadId);
      await player.save();

      return { message: "Mousepad added to player successfully", player };
    }
    catch (error: any) {
      return { error: error.message };
    }
  }

}