import { Body, Get, Delete, Post, Route } from "tsoa"
import { MouseModel } from "../models/Mouse"
import { JsonObject } from "swagger-ui-express"

@Route("api/Mouse")
export default class MouseController {
  @Post("/create")
  public async create(@Body() body: { name: string; brand:string }): Promise<string> {
    const data = new MouseModel({
      name: body.name,
      brand: body.brand,
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
      const data = await MouseModel.find();
      return data;
    }
    catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Delete("/delete/:id")
  public async delete(id: string): Promise<JsonObject> {
    try {
      const data = await MouseModel.findByIdAndDelete(id)
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

}
