import { Hotel, CreateHotelRequest } from '../models/interfaces';
import { runQuery, getQuery, getSingleQuery } from '../config/database';

export const createHotel = async (hotelData: CreateHotelRequest): Promise<Hotel> => {
  const { name, address, city, country, rating } = hotelData;
  
  const result = await runQuery(
    `INSERT INTO hotels (name, address, city, country, rating) 
     VALUES (?, ?, ?, ?, ?)`,
    [name, address, city, country, rating || null]
  );
  
  return {
    id: result.id,
    ...hotelData
  };
};

export const getAllHotels = async (): Promise<Hotel[]> => {
  return await getQuery('SELECT * FROM hotels');
};

export const getHotelById = async (id: number): Promise<Hotel | null> => {
  const hotel = await getSingleQuery('SELECT * FROM hotels WHERE id = ?', [id]);
  return hotel || null;
};

export const updateHotel = async (id: number, hotelData: Partial<Hotel>): Promise<boolean> => {
  const hotel = await getHotelById(id);
  
  if (!hotel) {
    return false;
  }
  
  const updates: string[] = [];
  const values: any[] = [];
  
  Object.entries(hotelData).forEach(([key, value]) => {
    if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  });
  
  if (updates.length === 0) {
    return true;
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP');
  
  const query = `UPDATE hotels SET ${updates.join(', ')} WHERE id = ?`;
  values.push(id);
  
  const result = await runQuery(query, values);
  return result.changes > 0;
};

export const deleteHotel = async (id: number): Promise<boolean> => {
  const result = await runQuery('DELETE FROM hotels WHERE id = ?', [id]);
  return result.changes > 0;
};
