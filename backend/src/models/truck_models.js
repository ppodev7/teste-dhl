import mongoose from "mongoose";

export const STATUS_CAMINHAO = {
  AGUARDANDO: "AGUARDANDO",
  NO_PATIO: "NO PÁTIO",
  FINALIZADO: "FINALIZADO",
};

const caminhaoSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: [true, "O campo 'placa' é obrigatório."],
    unique: true,
    trim: true,
  },
  
  motorista: {
    type: String,
    required: [true, "O campo 'motorista' é obrigatório."],
    trim: true,
  },
  
  carga: {
    type: String,
    required: [true, "O campo 'carga' é obrigatório."],
    trim: true,
  },

  
  empresa: {
    type: String,
    required: [true, "O campo 'empresa' é obrigatório."],
    trim: true,
  },

  horarioEntrada: {
    type: Date,
    default: Date.now,
  },

  horarioSaida: {
    type: Date,
    default: null,
  },

  status: {
    type: String,
    enum: Object.values(STATUS_CAMINHAO),
    default: STATUS_CAMINHAO.AGUARDANDO,
  }
},
  {
    // Opção que cria e gerencia automaticamente os campos:
    // `createdAt`: Data e hora em que o documento foi criado.
    // `updatedAt`: Data e hora da última atualização do documento.
    timestamps: true
  }
);

export const Caminhao = mongoose.model("Caminhao", caminhaoSchema);