import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/database.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 3001;

connectDB();

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});