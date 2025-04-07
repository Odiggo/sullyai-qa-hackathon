import { Request, Response } from 'express';
import { CreateBookingRequest, ApiResponse, Booking } from '../models/interfaces';
import * as bookingService from '../services/bookingService';
import * as userService from '../services/userService';
import * as roomService from '../services/roomService';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData: CreateBookingRequest = req.body;
    
    if (!bookingData.user_id || !bookingData.room_id || !bookingData.check_in_date || !bookingData.check_out_date) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const user = await userService.getUserById(bookingData.user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const room = await roomService.getRoomById(bookingData.room_id);
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    const checkIn = new Date(bookingData.check_in_date);
    const checkOut = new Date(bookingData.check_out_date);
    
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid date format'
      });
    }
    
    if (checkIn >= checkOut) {
      return res.status(400).json({
        success: false,
        error: 'Check-out date must be after check-in date'
      });
    }
    
    const booking = await bookingService.createBooking(bookingData);
    
    if (!booking) {
      return res.status(400).json({
        success: false,
        error: 'Room is not available or invalid booking data'
      });
    }
    
    const response: ApiResponse<Booking> = {
      success: true,
      data: booking,
      message: 'Booking created successfully'
    };
    
    return res.status(201).json(response);
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getAllBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    
    const response: ApiResponse<Booking[]> = {
      success: true,
      data: bookings,
      message: 'Bookings retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting bookings:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid booking ID'
      });
    }
    
    const booking = await bookingService.getBookingById(id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    const response: ApiResponse<Booking> = {
      success: true,
      data: booking,
      message: 'Booking retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting booking:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getBookingsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    }
    
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const bookings = await bookingService.getBookingsByUserId(userId);
    
    const response: ApiResponse<Booking[]> = {
      success: true,
      data: bookings,
      message: 'Bookings retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting bookings by user ID:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid booking ID'
      });
    }
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Missing status field'
      });
    }
    
    const validStatuses = ['confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }
    
    const success = await bookingService.updateBookingStatus(id, status);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Booking status updated successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error updating booking status:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid booking ID'
      });
    }
    
    const success = await bookingService.cancelBooking(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found or already cancelled'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Booking cancelled successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid booking ID'
      });
    }
    
    const success = await bookingService.deleteBooking(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Booking deleted successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error deleting booking:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
