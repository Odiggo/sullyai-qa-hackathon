import { Booking, CreateBookingRequest } from '../models/interfaces';
import { runQuery, getQuery, getSingleQuery } from '../config/database';
import { getRoomById, updateRoomAvailability } from './roomService';

export const createBooking = async (bookingData: CreateBookingRequest): Promise<Booking | null> => {
  const { user_id, room_id, check_in_date, check_out_date } = bookingData;
  
  const room = await getRoomById(room_id);
  if (!room || !room.is_available) {
    return null;
  }
  
  const checkIn = new Date(check_in_date);
  const checkOut = new Date(check_out_date);
  const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  
  if (days <= 0) {
    return null; // Invalid date range
  }
  
  const totalPrice = days * room.price_per_night;
  
  try {
    const result = await runQuery(
      `INSERT INTO bookings (user_id, room_id, check_in_date, check_out_date, total_price, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, room_id, check_in_date, check_out_date, totalPrice, 'confirmed']
    );
    
    await updateRoomAvailability(room_id, false);
    
    return {
      id: result.id,
      user_id,
      room_id,
      check_in_date,
      check_out_date,
      total_price: totalPrice,
      status: 'confirmed'
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return null;
  }
};

export const getAllBookings = async (): Promise<Booking[]> => {
  return await getQuery('SELECT * FROM bookings');
};

export const getBookingById = async (id: number): Promise<Booking | null> => {
  const booking = await getSingleQuery('SELECT * FROM bookings WHERE id = ?', [id]);
  return booking || null;
};

export const getBookingsByUserId = async (userId: number): Promise<Booking[]> => {
  return await getQuery('SELECT * FROM bookings WHERE user_id = ?', [userId]);
};

export const getBookingsByRoomId = async (roomId: number): Promise<Booking[]> => {
  return await getQuery('SELECT * FROM bookings WHERE room_id = ?', [roomId]);
};

export const updateBookingStatus = async (id: number, status: string): Promise<boolean> => {
  const result = await runQuery(
    'UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [status, id]
  );
  
  return result.changes > 0;
};

export const cancelBooking = async (id: number): Promise<boolean> => {
  const booking = await getBookingById(id);
  
  if (!booking || booking.status === 'cancelled') {
    return false;
  }
  
  try {
    await updateBookingStatus(id, 'cancelled');
    
    await updateRoomAvailability(booking.room_id, true);
    
    return true;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return false;
  }
};

export const deleteBooking = async (id: number): Promise<boolean> => {
  const booking = await getBookingById(id);
  
  if (!booking) {
    return false;
  }
  
  try {
    const result = await runQuery('DELETE FROM bookings WHERE id = ?', [id]);
    
    if (booking.status !== 'cancelled') {
      await updateRoomAvailability(booking.room_id, true);
    }
    
    return result.changes > 0;
  } catch (error) {
    console.error('Error deleting booking:', error);
    return false;
  }
};
