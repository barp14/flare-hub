import { Body, Get, Delete, Post, Route, Tags } from "tsoa"
import { MousepadModel } from "../models/Mousepad"
import { JsonObject } from "swagger-ui-express"

@Route("api/Mousepad")
@Tags("Mousepad")
export default class MousepadController {
  @Post("/create")
  public async create(@Body() body: { name: string; brand:string }): Promise<string> {
    const data = new MousepadModel({
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
      const data = await MousepadModel.find();
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
      const data = await MousepadModel.findByIdAndDelete(id)
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

}
