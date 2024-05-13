import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import pingRoutes from './routes/pingRoutes'
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static("public"));
app.use(
  "/swagger", /* endereço do swagger */
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);  

app.use('/api/', pingRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});