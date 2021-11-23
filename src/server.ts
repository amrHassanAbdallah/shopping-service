import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productsRoutes from "./handlers/products";
import userRoutes from "./handlers/users";
import * as dotenv from "dotenv";
import ordersRoutes from "./handlers/orders";


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

productsRoutes(app)
userRoutes(app)
ordersRoutes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export { app };