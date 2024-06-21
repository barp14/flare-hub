import express, { Request, Response } from "express"
import TeamController from "../controllers/TeamController";

const router = express.Router();
const controller = new TeamController();

router.post("/create", async (req: Request, res: Response) => {
  console.log("Request Body:", req.body);  // Debug log para verificar o corpo da solicitação
  try {
    const response = await controller.create(req.body);
    console.log("Response:", response);  // Debug log para verificar a resposta
    res.status(response === "OK" ? 201 : 400).send(response);
  } catch (error) {
    console.error("Error:", error);  // Debug log para verificar erros
    res.status(500).send({ error: error instanceof Error ? error.message : "An unexpected error occurred" });
  }
});

router.get("/getAll", async (req: Request, res: Response) => {
  const response = await controller.all()

  return res.status(response.error ? 400 : 200).send(response)
})

router.get("/get/:id", async (req: Request, res: Response) => {
  const response = await controller.get(req.params.id)

  return res.status(response.error ? 400 : 200).send(response)
})

router.get("/getTeamsByType", async (req: Request, res: Response) => {
  try {
    const response = await controller.getTeamsByType(req.query.teamType as string);
    res.status(response.error ? 400 : 200).send(response);
  } catch (error) {
    res.status(500).send({ error: error instanceof Error ? error.message : "An unexpected error occurred" });
  }
});

router.get("/slug/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await controller.getBySlug(slug);
  res.send(result);
});


router.patch("/update", async (req: Request, res: Response) => {
  const response = await controller.update(req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

router.put("/addPlayer", async (req: Request, res: Response) => {
  const { teamId, playerId } = req.body;
  const result = await controller.addPlayer({ teamId, playerId });
  res.send(result);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const response = await controller.delete(req.params.id)

  return res.status(response.error ? 400 : 200).send(response)
})

export default router;
