import express, { Request, Response } from "express"
import PlayerController from "../controllers/PlayerController";

const router = express.Router();
const controller = new PlayerController();

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

router.put("/addEquipment/:playerId", async (req, res) => {
  const response = await controller.addEquipment(req.params.playerId, req.body);
  res.send(response);
});

// router.put("/addKeyboard/:playerId", async (req, res) => {
//   const response = await controller.addKeyboard(req.params.playerId, req.body);
//   res.send(response);
// });

// router.put("/addMouse/:playerId", async (req, res) => {
//   const response = await controller.addMouse(req.params.playerId, req.body);
//   res.send(response);
// });

// router.put("/addMousepad/:playerId", async (req, res) => {
//   const response = await controller.addMousepad(req.params.playerId, req.body);
//   res.send(response);
// });

router.get("/getAll", async (req, res) => {
  const response = await controller.all();
  res.json(response);
});

export default router;
