import express from "express";
const app = express();
import mongoose from "mongoose";
import { IConfig } from "./Interfaces";

let config: IConfig = require('../../config.json');
//let bodyParser = require('body-parser')

// Import routes
import { router as authRoute } from "./Routes/auth";
import { router as userRoute } from "./Routes/user";
import { router as rootRoute } from "./Routes/root";
import { router as sourcesRoute } from "./Routes/sources";
import morganMiddleware from "./Middlewares/morgan";
import cookieParser from "cookie-parser";

// Connect to DB
const connectionString: string = `mongodb+srv://${config.database.username}:${config.database.password}@wap.27syxzs.mongodb.net/?retryWrites=true&w=majority`;
try { 
  mongoose.connect(connectionString);
  console.log("Connected to DB!")
} catch (error) {
  console.error(error);
}

// Middlewares
app.use(express.json());
app.use(morganMiddleware);
app.use(cookieParser());
//app.use(bodyParser.json())

// Route Middlewares
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/', rootRoute);
app.use('/static', sourcesRoute);

app.listen(config.server.port, () => {
    console.log(`Server started at: http://localhost:${config.server.port}/`);
});