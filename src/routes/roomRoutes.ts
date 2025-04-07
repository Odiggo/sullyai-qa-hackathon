import express from 'express';
import * as roomController from '../controllers/roomController';

const router = express.Router();

router.get('/', roomController.getAllRooms as any);

router.get('/:id', roomController.getRoomById as any);

router.get('/hotel/:hotelId', roomController.getRoomsByHotelId as any);

router.get('/hotel/:hotelId/available', roomController.getAvailableRoomsByHotelId as any);

router.post('/', roomController.createRoom as any);

router.put('/:id', roomController.updateRoom as any);

router.patch('/:id/availability', roomController.updateRoomAvailability as any);

router.delete('/:id', roomController.deleteRoom as any);

export default router;
