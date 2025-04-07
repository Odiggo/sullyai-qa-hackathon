import { initializeDatabase } from '../config/database';
import * as hotelService from '../services/hotelService';
import * as userService from '../services/userService';
import * as roomService from '../services/roomService';
import * as bookingService from '../services/bookingService';

export const seedDatabase = async (): Promise<void> => {
  try {
    await initializeDatabase();
    console.log('Database initialized successfully');
    
    const hotel1 = await hotelService.createHotel({
      name: 'Grand Hotel',
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
      rating: 5
    });
    
    const hotel2 = await hotelService.createHotel({
      name: 'Seaside Resort',
      address: '456 Beach Road',
      city: 'Miami',
      country: 'USA',
      rating: 4
    });
    
    console.log('Hotels seeded successfully');
    
    const user1 = await userService.createUser({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890'
    });
    
    const user2 = await userService.createUser({
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+0987654321'
    });
    
    console.log('Users seeded successfully');
    
    const room1 = await roomService.createRoom({
      hotel_id: hotel1.id!,
      room_number: '101',
      room_type: 'Deluxe',
      price_per_night: 200
    });
    
    const room2 = await roomService.createRoom({
      hotel_id: hotel1.id!,
      room_number: '102',
      room_type: 'Suite',
      price_per_night: 350
    });
    
    const room3 = await roomService.createRoom({
      hotel_id: hotel2.id!,
      room_number: '201',
      room_type: 'Standard',
      price_per_night: 150
    });
    
    const room4 = await roomService.createRoom({
      hotel_id: hotel2.id!,
      room_number: '202',
      room_type: 'Deluxe',
      price_per_night: 250
    });
    
    console.log('Rooms seeded successfully');
    
    const checkInDate = new Date();
    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + 3);
    
    const booking1 = await bookingService.createBooking({
      user_id: user1.id!,
      room_id: room1.id!,
      check_in_date: checkInDate.toISOString().split('T')[0],
      check_out_date: checkOutDate.toISOString().split('T')[0]
    });
    
    checkInDate.setDate(checkInDate.getDate() + 7);
    checkOutDate.setDate(checkOutDate.getDate() + 7);
    
    const booking2 = await bookingService.createBooking({
      user_id: user2.id!,
      room_id: room3.id!,
      check_in_date: checkInDate.toISOString().split('T')[0],
      check_out_date: checkOutDate.toISOString().split('T')[0]
    });
    
    console.log('Bookings seeded successfully');
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seed script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed script failed:', error);
      process.exit(1);
    });
}
