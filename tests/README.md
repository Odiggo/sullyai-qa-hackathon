# Hotel Booking API Tests

This directory contains tests for the Hotel Booking API.

## Test Structure

- `conftest.py`: Contains pytest fixtures and setup for tests
- `test_hotels_api.py`: Tests for hotel endpoints
- `test_users_api.py`: Tests for user endpoints
- `test_rooms_api.py`: Tests for room endpoints
- `test_bookings_api.py`: Tests for booking endpoints
- `performance_test.py`: Performance tests for API endpoints
- `locustfile.py`: Load testing with Locust

## Running Tests

### Unit and Integration Tests

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Run specific test file
pytest test_hotels_api.py

# Run with coverage report
pytest --cov=tests/
```

### Performance Tests

```bash
# Run performance tests
python performance_test.py

# Run load tests with Locust
locust -f locustfile.py --host=http://localhost:3000
```

## CI/CD Pipeline

The CI/CD pipeline is configured in `.github/workflows/ci.yml` and includes:

1. **Linting**: Checks code quality with flake8
2. **Testing**: Runs all tests with coverage reporting
3. **Performance Testing**: Validates API performance
4. **Deployment**:
   - Staging deployment from main branch
   - Production deployment from release branch with approval

## Bug Reporting

When reporting bugs, include:
- Description of the issue
- Steps to reproduce
- Expected vs. actual behavior
- Severity and impact
- Proposed fix
