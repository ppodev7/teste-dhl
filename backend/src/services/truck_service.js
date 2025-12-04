import { Truck } from '../models/truck_models.js'; 

export const createTruck = async (data) => {

  try {
    // Tenta criar um novo documento 'Truck' no banco de dados com os dados fornecidos.
    const newTruck = await Truck.create(data);
    return newTruck;
  } catch (error) {
    throw error; // Delega o erro para ser tratado em controller.
  }
};

export const listTrucks = async (filters = {}) => {
  try {
    // O objeto 'filters' (vindo de req.query) é passado diretamente para o find().
    const allTrucks = await Truck.find(filters);
    return allTrucks;
  } catch (error) {
    throw error;  
  }
};

export const updateTrucks = async (id, data) => {
  try {
    const updatedTruck = await Truck.findByIdAndUpdate(id, data, { new: true }); // new: true - retorna os dados atualizados. 
    return updatedTruck;
  } catch (error) {
    throw error;
  }
};

export const deleteTrucks = async (id) => {
  try {
    const deletedTruck = await Truck.findByIdAndDelete(id);
    return deletedTruck;
  } catch (error) {
    throw error;
  }
};