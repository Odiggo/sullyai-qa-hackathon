import { Room, CreateRoomRequest } from '../models/interfaces';
import { runQuery, getQuery, getSingleQuery } from '../config/database';

export const createRoom = async (roomData: CreateRoomRequest): Promise<Room> => {
  const { hotel_id, room_number, room_type, price_per_night, is_available } = roomData;
  
  const result = await runQuery(
    `INSERT INTO rooms (hotel_id, room_number, room_type, price_per_night, is_available) 
     VALUES (?, ?, ?, ?, ?)`,
    [hotel_id, room_number, room_type, price_per_night, is_available === false ? 0 : 1]
  );
  
  return {
    id: result.id,
    ...roomData
  };
};

export const getAllRooms = async (): Promise<Room[]> => {
  return await getQuery('SELECT * FROM rooms');
};

export const getRoomsByHotelId = async (hotelId: number): Promise<Room[]> => {
  return await getQuery('SELECT * FROM rooms WHERE hotel_id = ?', [hotelId]);
};

export const getAvailableRoomsByHotelId = async (hotelId: number): Promise<Room[]> => {
  return await getQuery('SELECT * FROM rooms WHERE hotel_id = ? AND is_available = "1"', [hotelId]);
};

export const getRoomById = async (id: number): Promise<Room | null> => {
  const room = await getSingleQuery('SELECT * FROM rooms WHERE id = ?', [id]);
  return room || null;
};

export const updateRoom = async (id: number, roomData: Partial<Room>): Promise<boolean> => {
  const room = await getRoomById(id);
  
  if (!room) {
    return false;
  }
  
  const updates: string[] = [];
  const values: any[] = [];
  
  Object.entries(roomData).forEach(([key, value]) => {
    if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
      if (key === 'is_available') {
        updates.push(`${key} = ?`);
        values.push(value === true ? 1 : 0);
      } else {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }
  });
  
  if (updates.length === 0) {
    return true;
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP');
  
  const query = `UPDATE rooms SET ${updates.join(', ')} WHERE id = ?`;
  values.push(id);
  
  const result = await runQuery(query, values);
  return result.changes > 0;
};

export const deleteRoom = async (id: number): Promise<boolean> => {
  const result = await runQuery('DELETE FROM rooms WHERE id = ?', [id]);
  return result.changes > 0;
};

export const updateRoomAvailability = async (id: number, isAvailable: boolean): Promise<boolean> => {
  const result = await runQuery(
    'UPDATE rooms SET is_available = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [isAvailable ? 1 : 0, id]
  );
  
  return result.changes > 0;
};
