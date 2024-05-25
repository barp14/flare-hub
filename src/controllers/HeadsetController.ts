import { Body, Get, Delete, Post, Route } from "tsoa"
import { HeadsetModel } from "../models/Headset"
import { JsonObject } from "swagger-ui-express"

@Route("api/Headset")
export default class HeadsetController {
  @Post("/create")
  public async create(@Body() body: { name: string; brand:string }): Promise<string> {
    const data = new HeadsetModel({
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
      const data = await HeadsetModel.find();
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
      const data = await HeadsetModel.findByIdAndDelete(id)
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

}
