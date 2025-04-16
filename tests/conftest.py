import pytest
import requests
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
BASE_URL = "http://localhost:3000/api"

@pytest.fixture(scope="session")
def api_base_url():
    return BASE_URL

@pytest.fixture(scope="session")
def api_client():
    """Return a session object for making API requests"""
    session = requests.Session()
    yield session
    session.close()

@pytest.fixture(scope="module")
def test_user(api_client, api_base_url):
    """Create a test user for use in tests"""
    user_data = {
        "first_name": "Test",
        "last_name": "User",
        "email": "testuser@example.com",
        "phone": "1234567890"
    }
    
    try:
        response = api_client.post(f"{api_base_url}/users", json=user_data)
        response.raise_for_status()
        user = response.json()
        logger.info(f"Created test user: {user}")
        yield user
        
        # Cleanup
        if "id" in user:
            api_client.delete(f"{api_base_url}/users/{user['id']}")
            logger.info(f"Deleted test user: {user['id']}")
    except requests.RequestException as e:
        logger.error(f"Error creating test user: {e}")
        pytest.skip("Failed to create test user")

@pytest.fixture(scope="module")
def test_hotel(api_client, api_base_url):
    """Create a test hotel for use in tests"""
    hotel_data = {
        "name": "Test Hotel",
        "address": "123 Test St",
        "city": "Test City",
        "country": "Test Country",
        "rating": 4
    }
    
    try:
        response = api_client.post(f"{api_base_url}/hotels", json=hotel_data)
        response.raise_for_status()
        hotel = response.json()
        logger.info(f"Created test hotel: {hotel}")
        yield hotel
        
        # Cleanup
        if "id" in hotel:
            api_client.delete(f"{api_base_url}/hotels/{hotel['id']}")
            logger.info(f"Deleted test hotel: {hotel['id']}")
    except requests.RequestException as e:
        logger.error(f"Error creating test hotel: {e}")
        pytest.skip("Failed to create test hotel")
