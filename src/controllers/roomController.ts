import { Request, Response } from 'express';
import { CreateRoomRequest, ApiResponse, Room } from '../models/interfaces';
import * as roomService from '../services/roomService';
import * as hotelService from '../services/hotelService';

export const createRoom = async (req: Request, res: Response) => {
  try {
    const roomData: CreateRoomRequest = req.body;
    
    if (!roomData.hotel_id || !roomData.room_number || !roomData.room_type || roomData.price_per_night === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const hotel = await hotelService.getHotelById(roomData.hotel_id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: 'Hotel not found'
      });
    }
    
    const room = await roomService.createRoom(roomData);
    
    const response: ApiResponse<Room> = {
      success: true,
      data: room,
      message: 'Room created successfully'
    };
    
    return res.status(201).json(response);
  } catch (error) {
    console.error('Error creating room:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getAllRooms = async (_req: Request, res: Response) => {
  try {
    const rooms = await roomService.getAllRooms();
    
    const response: ApiResponse<Room[]> = {
      success: true,
      data: rooms,
      message: 'Rooms retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting rooms:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getRoomsByHotelId = async (req: Request, res: Response) => {
  try {
    const hotelId = parseInt(req.params.hotelId);
    
    if (isNaN(hotelId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid hotel ID'
      });
    }
    
    const hotel = await hotelService.getHotelById(hotelId);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: 'Hotel not found'
      });
    }
    
    const rooms = await roomService.getRoomsByHotelId(hotelId);
    
    const response: ApiResponse<Room[]> = {
      success: true,
      data: rooms,
      message: 'Rooms retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting rooms by hotel ID:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getAvailableRoomsByHotelId = async (req: Request, res: Response) => {
  try {
    const hotelId = parseInt(req.params.hotelId);
    
    if (isNaN(hotelId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid hotel ID'
      });
    }
    
    const hotel = await hotelService.getHotelById(hotelId);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: 'Hotel not found'
      });
    }
    
    const rooms = await roomService.getAvailableRoomsByHotelId(hotelId);
    
    const response: ApiResponse<Room[]> = {
      success: true,
      data: rooms,
      message: 'Available rooms retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting available rooms by hotel ID:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid room ID'
      });
    }
    
    const room = await roomService.getRoomById(id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    const response: ApiResponse<Room> = {
      success: true,
      data: room,
      message: 'Room retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting room:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const roomData: Partial<Room> = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid room ID'
      });
    }
    
    if (roomData.hotel_id) {
      const hotel = await hotelService.getHotelById(roomData.hotel_id);
      if (!hotel) {
        return res.status(404).json({
          success: false,
          error: 'Hotel not found'
        });
      }
    }
    
    const success = await roomService.updateRoom(id, roomData);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Room updated successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error updating room:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid room ID'
      });
    }
    
    const success = await roomService.deleteRoom(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Room deleted successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error deleting room:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateRoomAvailability = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { is_available } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid room ID'
      });
    }
    
    if (is_available === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing is_available field'
      });
    }
    
    const success = await roomService.updateRoomAvailability(id, is_available);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Room not found'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Room availability updated successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error updating room availability:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
