# Hotel Booking API

A simple REST API for hotel bookings built with TypeScript, Express, and SQLite. This project serves as a sample for QA/release engineering interview hackathons.

## Features

- RESTful API for hotel bookings
- Local SQLite database
- No authentication required
- CRUD operations for hotels, users, rooms, and bookings

## Database Schema

The database consists of the following tables:

- **hotels**: Store hotel information
- **users**: Store user information
- **rooms**: Store room information for hotels
- **bookings**: Store booking information

## API Endpoints

### Hotels

- `GET /api/hotels`: Get all hotels
- `GET /api/hotels/:id`: Get hotel by ID
- `POST /api/hotels`: Create a new hotel
- `PUT /api/hotels/:id`: Update a hotel
- `DELETE /api/hotels/:id`: Delete a hotel

### Users

- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/:id`: Update a user
- `DELETE /api/users/:id`: Delete a user

### Rooms

- `GET /api/rooms`: Get all rooms
- `GET /api/rooms/:id`: Get room by ID
- `GET /api/rooms/hotel/:hotelId`: Get rooms by hotel ID
- `GET /api/rooms/hotel/:hotelId/available`: Get available rooms by hotel ID
- `POST /api/rooms`: Create a new room
- `PUT /api/rooms/:id`: Update a room
- `PATCH /api/rooms/:id/availability`: Update room availability
- `DELETE /api/rooms/:id`: Delete a room

### Bookings

- `GET /api/bookings`: Get all bookings
- `GET /api/bookings/:id`: Get booking by ID
- `GET /api/bookings/user/:userId`: Get bookings by user ID
- `POST /api/bookings`: Create a new booking
- `PATCH /api/bookings/:id/status`: Update booking status
- `PATCH /api/bookings/:id/cancel`: Cancel a booking
- `DELETE /api/bookings/:id`: Delete a booking

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Odiggo/sullyai-qa-hackathon.git
   cd sullyai-qa-hackathon
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Seed the database with sample data:
   ```
   npm run seed
   ```

## Development

- `npm run dev`: Start the development server with hot-reloading
- `npm run build`: Build the project for production
- `npm start`: Start the production server
- `npm run seed`: Seed the database with sample data

## Testing

This project is designed for QA/release engineering interview hackathons. Candidates can:

1. Add tests for the API endpoints
2. Build a CI/CD pipeline for releases
3. Implement automated testing strategies
