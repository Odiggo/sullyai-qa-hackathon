
export interface Hotel {
  id?: number;
  name: string;
  address: string;
  city: string;
  country: string;
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Room {
  id?: number;
  hotel_id: number;
  room_number: string;
  room_type: string;
  price_per_night: number;
  is_available?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id?: number;
  user_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}


export interface CreateHotelRequest {
  name: string;
  address: string;
  city: string;
  country: string;
  rating?: number;
}

export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

export interface CreateRoomRequest {
  hotel_id: number;
  room_number: string;
  room_type: string;
  price_per_night: number;
  is_available?: boolean;
}

export interface CreateBookingRequest {
  user_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
