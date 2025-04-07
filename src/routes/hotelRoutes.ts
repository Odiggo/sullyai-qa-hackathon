import express from 'express';
import * as hotelController from '../controllers/hotelController';

const router = express.Router();

router.get('/', hotelController.getAllHotels as any);

router.get('/:id', hotelController.getHotelById as any);

router.post('/', hotelController.createHotel as any);

router.put('/:id', hotelController.updateHotel as any);

router.delete('/:id', hotelController.deleteHotel as any);

export default router;
