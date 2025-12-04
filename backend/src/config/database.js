import mongoose from "mongoose"; 

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB rodando com sucesso!")

    } catch (error) {
        console.log("Erro ao conectar ao MongoDB", error);
        process.exit(1); // Encerra a aplicação em caso de erro.
    }
};