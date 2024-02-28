// env
import { config } from "dotenv"

// database
import { MongoClient } from "./database/mongo"

// express
import express, { Request, Response, NextFunction } from "express"

// cookie-parser
import cookieParser = require("cookie-parser")

// cors
import cors from "cors"

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
}

// routers
import authRouter from "./routes/auth/auth"
import InvoiceRouter from "./routes/invoice/invoice"

const main = async () => {
  config()

  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(cors(corsOptions))
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Credentials", "true")
    next()
  })

  await MongoClient.connect()

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
  })
  app.use("/auth", authRouter)
  app.use("/invoice", InvoiceRouter)

  const port = 5000

  app.listen(port, async () => {
    console.log(`listening on port http://localhost:${port}`)
  })
}

main()
