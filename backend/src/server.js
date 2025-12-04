import dotenv from "dotenv";
dotenv.config();

import  app  from "./app.js";
import { connectDB } from "./config/database.js";

const PORT = process.env.PORT || 3001;

connectDB();

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});