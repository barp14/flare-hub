import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"

import playerRoutes from "./routes/PlayerRoutes"
import equipmentRoutes from "./routes/EquipmentRoutes"
// import headsetRoutes from "./routes/HeadsetRoutes"
// import keyboardRoutes from "./routes/KeyboardRoutes"
// import mouseRoutes from "./routes/MouseRoutes"
// import mousepadRoutes from "./routes/MousepadRoutes"

import swaggerUi from "swagger-ui-express"
import { connect } from "./service/database"

dotenv.config()

const app: Express = express()

const port = process.env.PORT
const databaseUrl = process.env.DATABASE_URL || ""

connect(databaseUrl)

app.use(express.json())
app.use(express.static("public"))
app.use(
  "/swagger", // endereço de onde o swagger responde
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
)

app.use("/api/player", playerRoutes)
app.use("/api/equipment", equipmentRoutes)
// app.use("/api/headset", headsetRoutes)
// app.use("/api/keyboard", keyboardRoutes)
// app.use("/api/mouse", mouseRoutes)
// app.use("/api/mousepad", mousepadRoutes)

// aceitar requisições desse endereço
const corsOptions = { 
  origin : ['http://localhost:3000'], 
} 
 
app.use(cors(corsOptions)) 

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server")
})

app.listen(port, () => {
  console.log(`Server Started at ${port}`)
})