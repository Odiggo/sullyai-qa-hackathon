import { Request, Response } from 'express';
import { CreateHotelRequest, ApiResponse, Hotel } from '../models/interfaces';
import * as hotelService from '../services/hotelService';

export const createHotel = async (req: Request, res: Response) => {
  try {
    const hotelData: CreateHotelRequest = req.body;
    
    if (!hotelData.name || !hotelData.address || !hotelData.city || !hotelData.country) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const hotel = await hotelService.createHotel(hotelData);
    
    const response: ApiResponse<Hotel> = {
      success: true,
      data: hotel,
      message: 'Hotel created successfully'
    };
    
    return res.status(201).json(response);
  } catch (error) {
    console.error('Error creating hotel:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getAllHotels = async (_req: Request, res: Response) => {
  try {
    const hotels = await hotelService.getAllHotels();
    
    const response: ApiResponse<Hotel[]> = {
      success: true,
      data: hotels,
      message: 'Hotels retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting hotels:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid hotel ID'
      });
    }
    
    const hotel = await hotelService.getHotelById(id);
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: 'Hotel not found'
      });
    }
    
    const response: ApiResponse<Hotel> = {
      success: true,
      data: hotel,
      message: 'Hotel retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting hotel:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateHotel = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const hotelData: Partial<Hotel> = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid hotel ID'
      });
    }
    
    const success = await hotelService.updateHotel(id, hotelData);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Hotel not found'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Hotel updated successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error updating hotel:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid hotel ID'
      });
    }
    
    const success = await hotelService.deleteHotel(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Hotel not found'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Hotel deleted successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error deleting hotel:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
