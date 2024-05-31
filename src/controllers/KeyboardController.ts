import { Body, Get, Delete, Post, Route, Tags } from "tsoa"
import { KeyboardModel } from "../models/Keyboard"
import { JsonObject } from "swagger-ui-express"

@Route("api/Keyboard")
@Tags("Keyboard")
export default class KeyboardController {
  @Post("/create")
  public async create(@Body() body: { name: string; brand:string }): Promise<string> {
    const data = new KeyboardModel({
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
      const data = await KeyboardModel.find();
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
      const data = await KeyboardModel.findByIdAndDelete(id)
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

}
