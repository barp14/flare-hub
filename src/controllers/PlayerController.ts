import { Body, Get, Patch, Delete, Post, Route } from "tsoa"
import { PlayerModel } from "../models/Player"
import { JsonObject } from "swagger-ui-express"

@Route("api/Player")
export default class PlayerController {
  @Post("/create")
  public async create(@Body() body: { name: string }): Promise<string> {
    const data = new PlayerModel({
      name: body.name,
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
  public async update(@Body() body: { id: string; name: string }): Promise<JsonObject> {
    try {
      const result = await PlayerModel.findByIdAndUpdate(
        body.id, { name: body.name }
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
}