import mongoose from "mongoose";

export const STATUS_CAMINHAO = {
  AGUARDANDO: "AGUARDANDO",
  NO_PATIO: "NO PÁTIO",
  FINALIZADO: "FINALIZADO",
};

const caminhaoSchema = new mongoose.Schema({
  placa: {
    type: String,
    required: true,
  },
  
  motorista: {
    type: String,
    required: true,
  },
  
  empresa: {
    type: String,
    required: true,
  },

  horarioEntrada: {
    type: Date,
    default: Date.now,
  },

  horarioSaida: {
    type: Date
  },

  status: {
    type: String,
    enum: Object.values(STATUS_CAMINHAO),
    default: STATUS_CAMINHAO.AGUARDANDO,
  }

},

// Habilita a criação automática dos campos `createdAt` e `updatedAt (createdAT - Data e hora em que o campo foi criado, updateAT - Data e hora da última atualização do campo)
{ timestamps: true }

);

export const Caminhao = mongoose.model("Caminhao", caminhaoSchema);

  