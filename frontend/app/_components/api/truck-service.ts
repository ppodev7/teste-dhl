/**
 * Centraliza todas as chamadas HTTP para o backend
 */

import { Truck, TruckInput } from "../types/truck";

const API_URL = "http://localhost:3001/api";


export async function getTrucks(): Promise<Truck[]> {

  const response = await fetch(`${API_URL}/trucks`);


  if (!response.ok) {
    throw new Error("Erro ao buscar caminhões");
  }

  // Converte a resposta JSON para objeto JavaScript
  return response.json();
}

export async function createTruck(data: TruckInput): Promise<Truck> {
  const response = await fetch(`${API_URL}/trucks`, {
    method: "POST",
    headers: {
      // Diz pro backend que estamos enviando JSON
      "Content-Type": "application/json",
    },
    // Converte o objeto JavaScript para string JSON
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar caminhão");
  }

  return response.json();
}

export async function updateTruck(id: string, data: TruckInput): Promise<Truck> {
  const response = await fetch(`${API_URL}/trucks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar caminhão");
  }

  return response.json();
}


export async function deleteTruck(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/trucks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir caminhão");
  }

  // DELETE retorna 204 No Content, então não tem body
}

