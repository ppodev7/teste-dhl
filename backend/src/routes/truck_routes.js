import { Router } from 'express';
import {
    registerEntry,
    getTrucks,
    updateTruckData,
    removeTruck
} from '../controllers/truck_controller.js';

const router = Router();

router.post('/trucks', registerEntry);
router.get('/trucks', getTrucks);
router.put('/trucks/:id', updateTruckData);
router.delete('/trucks/:id', removeTruck);

export default router;