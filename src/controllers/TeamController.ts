import { Put, Body, Get, Patch, Delete, Post, Route, Tags } from "tsoa";
import { TeamModel } from "../models/Team";
import { JsonObject } from "swagger-ui-express";
import { PlayerModel } from "../models/Player";

@Route("api/Team")
@Tags("Team")
export default class TeamController {

  @Post("/create")
  public async create(@Body() body: { name: string; description: string; teamType: string; }): Promise<string> {
    const data = new TeamModel({
      name: body.name,
      description: body.description,
      teamType: body.teamType,
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
      const data = await TeamModel.find();
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
      const data = await TeamModel.findById(id);
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
  public async update(@Body() body: { id: string; name: string; description: string; teamType: string }): Promise<JsonObject> {
    try {
      const result = await TeamModel.findByIdAndUpdate(
        body.id, { name: body.name, description: body.description, teamType: body.teamType }
      )
      return { result: result };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Put("/addPlayer")
  public async addPlayer(@Body() body: { teamId: string, playerId: string }): Promise<string> {
    try {
      const team = await TeamModel.findById(body.teamId);
      if (!team) {
        return "Team not found";
      }

      const player = await PlayerModel.findById(body.playerId);
      if (!player) {
        return "Player not found";
      }

      if (team.players.some(p => p.playerId?.equals(player._id))) {
        return "Player already in team";
      }

      if (team.players.length >= 5) {
        return "Team is already full";
      }

      team.players.push({ playerId: player._id });
      await team.save();

      return "Player added to team successfully";
    } catch (error: any) {
      console.error("Error adding player to team:", error);
      return error.message;
    }
  }

  @Delete("/delete/:id")
  public async delete(id: string): Promise<JsonObject> {
    try {
      const data = await TeamModel.findByIdAndDelete(id)
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }
}