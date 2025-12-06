import mongoose from "mongoose"; 

// Usa variável de ambiente ou valor padrão para desenvolvimento local
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/zyx";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB rodando com sucesso!")

    } catch (error) {
        console.log("Erro ao conectar ao MongoDB", error);
        process.exit(1); // Encerra a aplicação em caso de erro.
    }
};