import express, { Request, Response } from "express"
import EquipmentController from "../controllers/EquipmentController";

const router = express.Router();
const controller = new EquipmentController();

router.put("/addHeadset", async (req, res) => {
  const response = await controller.addHeadset(req.body);
  res.send(response);
});

router.put("/addKeyboard", async (req, res) => {
  const response = await controller.addKeyboard(req.body);
  res.send(response);
});

router.put("/addMouse", async (req, res) => {
  const response = await controller.addMouse(req.body);
  res.send(response);
});

router.put("/addMousepad", async (req, res) => {
  const response = await controller.addMousepad(req.body);
  res.send(response);
});

router.get("/getAll", async (req, res) => {
  const response = await controller.all();
  res.json(response);
});

router.get('/getBySlug/:slug', async (req, res) => {
  const slug = req.params.slug;
  console.log(`Received request to get equipment by slug: ${slug}`);
  const response = await controller.getBySlug(slug);
  return res.status(response.error ? 400 : 200).send(response);
});

router.delete("/delete/:id", async (req, res) => {
  const response = await controller.delete(req.params.id);
  res.json(response);
});

export default router;
