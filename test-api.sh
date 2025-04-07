

BASE_URL="http://localhost:3000"

echo "Starting API tests..."
echo "====================="

echo "Testing root endpoint..."
curl -s $BASE_URL
echo -e "\n"

echo "Testing Hotel endpoints..."
echo "1. Creating a hotel..."
HOTEL_RESPONSE=$(curl -s -X POST $BASE_URL/api/hotels \
  -H "Content-Type: application/json" \
  -d '{"name":"Grand Hotel","address":"123 Main St","city":"New York","country":"USA","rating":5}')
echo $HOTEL_RESPONSE
HOTEL_ID=$(echo $HOTEL_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo -e "\n"

echo "2. Getting all hotels..."
curl -s -X GET $BASE_URL/api/hotels
echo -e "\n"

echo "3. Getting hotel by ID..."
curl -s -X GET $BASE_URL/api/hotels/$HOTEL_ID
echo -e "\n"

echo "Testing User endpoints..."
echo "1. Creating a user..."
USER_RESPONSE=$(curl -s -X POST $BASE_URL/api/users \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","last_name":"Doe","email":"john.doe@example.com","phone":"1234567890"}')
echo $USER_RESPONSE
USER_ID=$(echo $USER_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo -e "\n"

echo "2. Getting all users..."
curl -s -X GET $BASE_URL/api/users
echo -e "\n"

echo "3. Getting user by ID..."
curl -s -X GET $BASE_URL/api/users/$USER_ID
echo -e "\n"

echo "Testing Room endpoints..."
echo "1. Creating a room..."
ROOM_RESPONSE=$(curl -s -X POST $BASE_URL/api/rooms \
  -H "Content-Type: application/json" \
  -d "{\"hotel_id\":$HOTEL_ID,\"room_number\":\"101\",\"room_type\":\"Deluxe\",\"price_per_night\":200}")
echo $ROOM_RESPONSE
ROOM_ID=$(echo $ROOM_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo -e "\n"

echo "2. Getting all rooms..."
curl -s -X GET $BASE_URL/api/rooms
echo -e "\n"

echo "3. Getting rooms by hotel ID..."
curl -s -X GET $BASE_URL/api/rooms/hotel/$HOTEL_ID
echo -e "\n"

echo "4. Getting available rooms by hotel ID..."
curl -s -X GET $BASE_URL/api/rooms/hotel/$HOTEL_ID/available
echo -e "\n"

echo "Testing Booking endpoints..."
echo "1. Creating a booking..."
CHECK_IN_DATE=$(date -d "+1 day" +%Y-%m-%d)
CHECK_OUT_DATE=$(date -d "+5 days" +%Y-%m-%d)
BOOKING_RESPONSE=$(curl -s -X POST $BASE_URL/api/bookings \
  -H "Content-Type: application/json" \
  -d "{\"user_id\":$USER_ID,\"room_id\":$ROOM_ID,\"check_in_date\":\"$CHECK_IN_DATE\",\"check_out_date\":\"$CHECK_OUT_DATE\"}")
echo $BOOKING_RESPONSE
BOOKING_ID=$(echo $BOOKING_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo -e "\n"

echo "2. Getting all bookings..."
curl -s -X GET $BASE_URL/api/bookings
echo -e "\n"

echo "3. Getting booking by ID..."
curl -s -X GET $BASE_URL/api/bookings/$BOOKING_ID
echo -e "\n"

echo "4. Getting bookings by user ID..."
curl -s -X GET $BASE_URL/api/bookings/user/$USER_ID
echo -e "\n"

echo "5. Updating booking status..."
curl -s -X PATCH $BASE_URL/api/bookings/$BOOKING_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status":"confirmed"}'
echo -e "\n"

echo "6. Cancelling booking..."
curl -s -X PATCH $BASE_URL/api/bookings/$BOOKING_ID/cancel
echo -e "\n"

echo "API tests completed!"
echo "===================="
