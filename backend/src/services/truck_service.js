import { Truck } from '../models/Truck.js';

export const createTruck = async (data) => {
    return await Truck.create(data);
};

export const listTrucks= async () => {
    return await Truck.find();
};

export const updateTrucks = async (id, data) => {
    return await Truck.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTrucks = async (id) => {
    return await Truck.findByIdAndDelete(id);
};