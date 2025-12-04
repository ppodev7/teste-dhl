import express from "express";
import cors from "cors";
import truckRoutes from "./routes/truck_routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", truckRoutes);

app.use(errorHandler);

export default app;
