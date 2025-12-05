import mongoose from "mongoose";

export const TRUCK_STATUS = {
  AGUARDANDO: "AGUARDANDO",
  EM_TRANSITO: "EM_TRANSITO",
  ENTREGUE: "ENTREGUE",
  CANCELADO: "CANCELADO",
  NO_PATIO: "NO PÁTIO",
  FINALIZADO: "FINALIZADO",
};

const truckSchema = new mongoose.Schema({
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

  origem: {
    cidade: {
      type: String,
      required: [true, "A cidade de origem é obrigatória."],
      trim: true,
    },
    endereco: {
      type: String,
      required: [true, "O endereço de origem é obrigatório."],
      trim: true,
    },
  },

  destino: {
    cidade: {
      type: String,
      required: [true, "A cidade de destino é obrigatória."],
      trim: true,
    },
    endereco: {
      type: String,
      required: [true, "O endereço de destino é obrigatório."],
      trim: true,
    },
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
    enum: Object.values(TRUCK_STATUS),
    default: TRUCK_STATUS.AGUARDANDO,
  }
},
  {
    // Opção que cria e gerencia automaticamente os campos:
    // `createdAt`: Data e hora em que o documento foi criado.
    // `updatedAt`: Data e hora da última atualização do documento.
    timestamps: true
  }
);

export const Truck = mongoose.model("Truck", truckSchema);
