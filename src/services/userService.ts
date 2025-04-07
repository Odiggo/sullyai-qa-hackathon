import { User, CreateUserRequest } from '../models/interfaces';
import { runQuery, getQuery, getSingleQuery } from '../config/database';

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const { first_name, last_name, email, phone } = userData;
  
  const result = await runQuery(
    `INSERT INTO users (first_name, last_name, email, phone) 
     VALUES (?, ?, ?, ?)`,
    [first_name, last_name, email, phone || null]
  );
  
  return {
    id: result.id,
    ...userData
  };
};

export const getAllUsers = async (): Promise<User[]> => {
  return await getQuery('SELECT * FROM users');
};

export const getUserById = async (id: number): Promise<User | null> => {
  const user = await getSingleQuery('SELECT * FROM users WHERE id = ?', [id]);
  return user || null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await getSingleQuery('SELECT * FROM users WHERE email = ?', [email]);
  return user || null;
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<boolean> => {
  const user = await getUserById(id);
  
  if (!user) {
    return false;
  }
  
  const updates: string[] = [];
  const values: any[] = [];
  
  Object.entries(userData).forEach(([key, value]) => {
    if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
      updates.push(`${key} = ?`);
      values.push(value);
    }
  });
  
  if (updates.length === 0) {
    return true;
  }
  
  updates.push('updated_at = CURRENT_TIMESTAMP');
  
  const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
  values.push(id);
  
  const result = await runQuery(query, values);
  return result.changes > 0;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const result = await runQuery('DELETE FROM users WHERE id = ?', [id]);
  return result.changes > 0;
};
