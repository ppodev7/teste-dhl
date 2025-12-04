export const errorHandler = (err, req, res, next) => {
    console.error("Erro detectado:", err);

    // Se for um erro de validação (ex: campo obrigatório faltando).
    if (err.name === 'ValidationError') {
        // Retorna um erro 400 (Requisição Inválida) com uma mensagem clara.
        return res.status(400).json({ message: "Dados inválidos fornecidos." });
    }

    // Se for um erro de chave duplicada (ex: placa já existe).
    if (err.code && err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `O campo '${field}' já está em uso.`;
        // Retorna um erro 409 (Conflito).
        return res.status(409).json({ message });
    }

    // Para todos os outros tipos de erro, retorna um erro 500 (Erro Interno do Servidor).
    return res.status(500).json({ 
        message: "Ocorreu um erro inesperado no servidor."
     });
};
