import express, { Request, Response } from "express"
import GameController from "../controllers/GameController";

const router = express.Router();
const controller = new GameController();

router.get("/getAll", async (req: Request, res: Response) => {
  const response = await controller.all()

  return res.status(response.error ? 400 : 200).send(response)
})

router.put("/addTeam", async (req, res) => {
  try {
    const response = await controller.addTeam(req.body);
    res.send(response);
  } catch (error) {
    res.status(500).send({ error: error instanceof Error ? error.message : "An unexpected error occurred" });
  }
});

export default router;
