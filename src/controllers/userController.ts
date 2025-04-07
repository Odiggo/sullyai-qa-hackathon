import { Request, Response } from 'express';
import { CreateUserRequest, ApiResponse, User } from '../models/interfaces';
import * as userService from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserRequest = req.body;
    
    if (!userData.first_name || !userData.last_name || !userData.email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const existingUser = await userService.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User with this email already exists'
      });
    }
    
    const user = await userService.createUser(userData);
    
    const response: ApiResponse<User> = {
      success: true,
      data: user,
      message: 'User created successfully'
    };
    
    return res.status(201).json(response);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    
    const response: ApiResponse<User[]> = {
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    }
    
    const user = await userService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const response: ApiResponse<User> = {
      success: true,
      data: user,
      message: 'User retrieved successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userData: Partial<User> = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    }
    
    if (userData.email) {
      const existingUser = await userService.getUserByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        return res.status(409).json({
          success: false,
          error: 'User with this email already exists'
        });
      }
    }
    
    const success = await userService.updateUser(id, userData);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'User updated successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    }
    
    const success = await userService.deleteUser(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'User deleted successfully'
    };
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
