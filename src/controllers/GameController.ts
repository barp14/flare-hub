import { Put, Body, Get, Patch, Delete, Post, Route, Tags, Path } from "tsoa";
import { GameModel } from "../models/Game";
import { TeamModel } from "../models/Team";
import { JsonObject } from "swagger-ui-express";

@Route("api/Game")
@Tags("Game")
export default class GameController {

  @Get("/getAll")
  public async all(): Promise<JsonObject> {
    try {
      const data = await GameModel.find();
      return data;
    }
    catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Put("/addTeam")
  public async addTeam(@Body() body: { teamId: string }): Promise<string> {
    try {
      const teamDoc = await TeamModel.findById(body.teamId);
      if (!teamDoc) {
        return "Team not found";
      }

      const teamType = teamDoc.teamType;

      // Verifica se já existe um documento de jogo no banco de dados
      let game = await GameModel.findOne();
      if (!game) {
        // Se não houver, cria um novo documento de jogo
        game = new GameModel({});
      }

      // Adiciona o time ao array apropriado no documento do jogo
      switch (teamType) {
        case "leagueOfLegends":
          if (!game.leagueOfLegendsTeams.some(team => team._id?.equals(teamDoc._id))) {
            game.leagueOfLegendsTeams.push(teamDoc);
          }
          break;
        case "counterStrike2":
          if (!game.counterStrike2Teams.some(team => team._id?.equals(teamDoc._id))) {
            game.counterStrike2Teams.push(teamDoc);
          }
          break;
        case "valorant":
          if (!game.valorantTeams.some(team => team._id?.equals(teamDoc._id))) {
            game.valorantTeams.push(teamDoc);
          }
          break;
        default:
          return "Invalid team type";
      }

      await game.save();
      return "Team added to game successfully";
    } catch (error: unknown) {
      console.error("Error adding team to game:", error);
      if (error instanceof Error) {
        return error.message;
      }
      return "An unexpected error occurred";
    }
  }
}