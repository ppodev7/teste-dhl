// Impotação dos Métodos do Serviço de Caminhões

import {
  createTruck,
  listTrucks,
  updateTrucks,
  deleteTrucks,
} from "../services/truck_service.js";

export const registerEntry = async (req, res, next) => {    
    try {
        const truck = await createTruck(req.body);
        return res.status(201).json(truck);
    } catch (error) {
        next(error);
    }
};

export const getTrucks = async (req, res, next) => {
    try {
        const filters = req.query;
        const trucks = await listTrucks(filters);
        return res.status(200).json(trucks);
    } catch (error) {
        next(error);
    }
};

export const updateTruckData = async (req, res, next) => {
    try {
        
        const updatedTruck = await updateTrucks(req.params.id, req.body);


        if (!updatedTruck) {
            return res.status(404).json({ message: "Caminhão não encontrado." });
        }

        return res.status(200).json(updatedTruck);
    } catch (error) {
        next(error);
    }
};


export const removeTruck = async (req, res, next) => {
    try {
        const deletedTruck = await deleteTrucks(req.params.id);

        if (!deletedTruck) {
            return res.status(404).json({ message: "Caminhão não encontrado." });
        }

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};
