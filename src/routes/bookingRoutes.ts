import express from 'express';
import * as bookingController from '../controllers/bookingController';

const router = express.Router();

router.get('/', bookingController.getAllBookings as any);

router.get('/user/:userId', bookingController.getBookingsByUserId as any);

router.get('/:id', bookingController.getBookingById as any);

router.post('/', bookingController.createBooking as any);

router.patch('/:id/status', bookingController.updateBookingStatus as any);

router.patch('/:id/cancel', bookingController.cancelBooking as any);

router.delete('/:id', bookingController.deleteBooking as any);

export default router;
