/**
 * Lista de status possíveis para um caminhão
 * 
 * Copiado do backend (truck_models.js)
 * Se mudar lá, muda aqui também!
 */
export const TRUCK_STATUS = {
  AGUARDANDO: "AGUARDANDO",
  EM_TRANSITO: "EM_TRANSITO",
  ENTREGUE: "ENTREGUE",
  CANCELADO: "CANCELADO",
  NO_PATIO: "NO_PATIO",
  FINALIZADO: "FINALIZADO",
} as const;


export type TruckStatus = (typeof TRUCK_STATUS)[keyof typeof TRUCK_STATUS];

/**
 * TruckLocation - Formato de origem/destino
 */
export interface TruckLocation {
  cidade: string;
  endereco: string;
}

/**
 * Truck - Formato completo de um caminhão
 * 
 * É o que RECEBEMOS do banco de dados
 * Tem _id porque o MongoDB gera automaticamente
 */
export interface Truck {
  _id: string;
  placa: string;
  motorista: string;
  carga: string;
  empresa: string;
  origem: TruckLocation;
  destino: TruckLocation;
  horarioEntrada: string;
  horarioSaida: string | null;
  status: TruckStatus;
}

/**
 * TruckInput - Formato para CRIAR um caminhão
 * 
 * É o que ENVIAMOS para o backend
 * Não tem _id porque o banco vai gerar
 */
export interface TruckInput {
  placa: string;
  motorista: string;
  carga: string;
  empresa: string;
  origem: TruckLocation;
  destino: TruckLocation;
  horarioEntrada?: string; // ISO string da data/hora
  horarioSaida?: string | null; // ISO string da data/hora ou null
  status?: TruckStatus;
}

