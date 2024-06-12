import express, { Request, Response } from "express"
import TeamController from "../controllers/TeamController";

const router = express.Router();
const controller = new TeamController();

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body)

  return res.status(response === "OK" ? 200 : 400).send(response)
})

router.get("/getAll", async (req: Request, res: Response) => {
  const response = await controller.all()

  return res.status(response.error ? 400 : 200).send(response)
})

router.get("/get/:id", async (req: Request, res: Response) => {
  const response = await controller.get(req.params.id)

  return res.status(response.error ? 400 : 200).send(response)
})

router.patch("/update", async (req: Request, res: Response) => {
  const response = await controller.update(req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

router.put("/addPlayer", async (req: Request, res: Response) => {
  try {
    const response = await controller.addPlayer(req.body);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error instanceof Error ? error.message : "An unexpected error occurred" });
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const response = await controller.delete(req.params.id)

  return res.status(response.error ? 400 : 200).send(response)
})

export default router;
