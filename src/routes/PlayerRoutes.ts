import express, { Request, Response } from "express"
import PlayerController from "../controllers/PlayerController"

const router = express.Router()
const controller = new PlayerController()

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body)

  return res.status(response === "OK" ? 200 : 400).send(response)
})

router.get("/getAll", async (req: Request, res: Response) => {
  const response = await controller.all()

  return res.status(response.error ? 400 : 200).send(response)
})

router.patch("/update", async (req: Request, res: Response) => {
  const response = await controller.update(req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const response = await controller.delete(req.params.id)

  return res.status(response.error ? 400 : 200).send(response)
})

router.put("/addHeadset/:playerId", async (req: Request, res: Response) => {
  const { playerId } = req.params;
  const { headsetId } = req.body;
  const response = await controller.addHeadsetToPlayer(playerId, { headsetId });

  return res.status(response.error ? 400 : 200).send(response);
});

router.put("/addKeyboard/:playerId", async (req: Request, res: Response) => {
  const { playerId } = req.params;
  const { keyboardId } = req.body;
  const response = await controller.addKeyboardToPlayer(playerId, { keyboardId });

  return res.status(response.error ? 400 : 200).send(response);
});

router.put("/addMouse/:playerId", async (req: Request, res: Response) => {
  const { playerId } = req.params;
  const { mouseId } = req.body;
  const response = await controller.addMouseToPlayer(playerId, { mouseId });

  return res.status(response.error ? 400 : 200).send(response);
});

router.put("/addMousepad/:playerId", async (req: Request, res: Response) => {
  const { playerId } = req.params;
  const { mousepadId } = req.body;
  const response = await controller.addMousepadToPlayer(playerId, { mousepadId });

  return res.status(response.error ? 400 : 200).send(response);
});

export default router