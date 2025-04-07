

BASE_URL="http://localhost:3000"

echo "Clearing database before tests..."
echo "================================"
cat > /tmp/clear-db.ts << EOL
import { clearDatabase } from './src/config/database';

clearDatabase()
  .then(() => {
    console.log('Database cleared successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error clearing database:', error);
    process.exit(1);
  });
EOL

ts-node /tmp/clear-db.ts
echo "Database cleared."
echo -e "\n"

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
echo "Extracted HOTEL_ID: $HOTEL_ID"
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
echo "Extracted USER_ID: $USER_ID"
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
echo "Extracted ROOM_ID: $ROOM_ID"
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

if [[ "$OSTYPE" == "darwin"* ]]; then
  CHECK_IN_DATE=$(date -v+1d +%Y-%m-%d)
  CHECK_OUT_DATE=$(date -v+5d +%Y-%m-%d)
else
  CHECK_IN_DATE=$(date -d "+1 day" +%Y-%m-%d 2>/dev/null || date -v+1d +%Y-%m-%d 2>/dev/null || date +%Y-%m-%d)
  CHECK_OUT_DATE=$(date -d "+5 days" +%Y-%m-%d 2>/dev/null || date -v+5d +%Y-%m-%d 2>/dev/null || date +%Y-%m-%d)
fi

echo "Using check-in date: $CHECK_IN_DATE"
echo "Using check-out date: $CHECK_OUT_DATE"

if [ -z "$USER_ID" ] || [ -z "$ROOM_ID" ]; then
  echo "ERROR: Missing user_id or room_id for booking creation"
  echo "USER_ID: $USER_ID"
  echo "ROOM_ID: $ROOM_ID"
  if [ -z "$USER_ID" ]; then
    echo "Creating a fallback user..."
    USER_RESPONSE=$(curl -s -X POST $BASE_URL/api/users \
      -H "Content-Type: application/json" \
      -d '{"first_name":"Jane","last_name":"Smith","email":"jane.smith@example.com","phone":"9876543210"}')
    USER_ID=$(echo $USER_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
    echo "Created fallback user with ID: $USER_ID"
  fi
  
  if [ -z "$ROOM_ID" ]; then
    echo "Creating a fallback hotel and room..."
    HOTEL_RESPONSE=$(curl -s -X POST $BASE_URL/api/hotels \
      -H "Content-Type: application/json" \
      -d '{"name":"Fallback Hotel","address":"456 Backup St","city":"Boston","country":"USA","rating":4}')
    HOTEL_ID=$(echo $HOTEL_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
    
    ROOM_RESPONSE=$(curl -s -X POST $BASE_URL/api/rooms \
      -H "Content-Type: application/json" \
      -d "{\"hotel_id\":$HOTEL_ID,\"room_number\":\"202\",\"room_type\":\"Standard\",\"price_per_night\":150}")
    ROOM_ID=$(echo $ROOM_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
    echo "Created fallback room with ID: $ROOM_ID"
  fi
fi

BOOKING_RESPONSE=$(curl -s -X POST $BASE_URL/api/bookings \
  -H "Content-Type: application/json" \
  -d "{\"user_id\":$USER_ID,\"room_id\":$ROOM_ID,\"check_in_date\":\"$CHECK_IN_DATE\",\"check_out_date\":\"$CHECK_OUT_DATE\"}")
echo $BOOKING_RESPONSE

BOOKING_ID=$(echo $BOOKING_RESPONSE | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
echo "Extracted BOOKING_ID: $BOOKING_ID"

if [ -z "$BOOKING_ID" ]; then
  echo "Failed to extract booking ID using primary method, trying alternative..."
  BOOKING_ID=$(echo $BOOKING_RESPONSE | grep -o '"data":{"id":[0-9]*' | head -1 | cut -d':' -f3 | tr -d '{"}')
  echo "Alternative extraction result: $BOOKING_ID"
fi

if [ -z "$BOOKING_ID" ]; then
  echo "WARNING: Could not extract booking ID from response. Using 1 for testing purposes."
  BOOKING_ID=1
fi

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
echo "Using BOOKING_ID: $BOOKING_ID for status update"
curl -s -X PATCH $BASE_URL/api/bookings/$BOOKING_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status":"confirmed"}'
echo -e "\n"

echo "6. Cancelling booking..."
echo "Using BOOKING_ID: $BOOKING_ID for cancellation"
curl -s -X PATCH $BASE_URL/api/bookings/$BOOKING_ID/cancel
echo -e "\n"

echo "API tests completed!"
echo "===================="
