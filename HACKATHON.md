# QA/Release Engineering Lead Hackathon Challenge

## Overview

Welcome to the technical assessment for the QA/Release Engineering Lead position! This hackathon is designed to evaluate your skills in API testing and CI/CD pipeline implementation.

You will be working with a Hotel Booking API and have **4 hours** to complete the following tasks:
1. Write comprehensive API integration tests
2. Set up a CI/CD pipeline using GitHub Actions or another CI tool of your choice
3. **Identify and document bugs** in the Hotel Booking API implementation

## Hotel Booking API

The Hotel Booking API is a RESTful service that allows users to:
- Search for hotel rooms based on location, dates, and guest count
- View detailed information about specific hotels
- Make, modify, and cancel reservations
- Manage user accounts and authentication

The API endpoints follow this structure:
- Base URL: `http://localhost:3000/api` (when running locally)

Key endpoints include:
- `GET /hotels` - List available hotels with filtering options
- `GET /hotels/{id}` - Get detailed information about a specific hotel
- `POST /bookings` - Create a new reservation
- `GET /bookings/{id}` - Get reservation details
- `PATCH /bookings/{id}` - Update a reservation
- `DELETE /bookings/{id}` - Cancel a reservation
- `POST /users` - Register a new user
- `GET /users/{id}` - Get user details

## Challenge Tasks

### Task 1: API Integration Testing

Develop a comprehensive suite of integration tests for the Hotel Booking API. The API contains several intentionally introduced bugs that you should identify through your testing. Look for issues related to:

1. **Data Validation** - Check how the API handles edge cases and invalid inputs
2. **Database Integrity** - Look for issues with data relationships and constraints
3. **API Design** - Identify problems with endpoint behavior or route configurations
4. **Business Logic** - Find inconsistencies in how business rules are applied
5. **Type Handling** - Discover issues with data type conversions or comparisons

For each bug you find, document:
- A clear description of the issue
- Steps to reproduce
- The expected vs. actual behavior
- The severity and potential impact
- A proposed fix
You may use any testing framework or language of your choice (e.g., Postman, REST Assured, Pytest, Jest, etc.).

### Task 2: CI/CD Pipeline Implementation

Design and implement a CI/CD pipeline that:

1. **Automates Testing**:
   - Runs your integration tests on every pull request
   - Generates test reports

2. **Deployment Stages**:
   - Implements at least two environments (e.g., staging and production)
   - Includes appropriate approval gates between environments

3. **Quality Gates**:
   - Enforces test coverage requirements
   - Performs basic security scanning

You can use GitHub Actions, Jenkins, CircleCI, or any other CI/CD tool of your choice.

## Deliverables

Please provide the following by the end of the hackathon:

1. **Test Suite**:
   - Complete test code organized in a maintainable structure
   - Documentation of test coverage and approach
   - Instructions to run tests locally

2. **CI/CD Configuration**:
   - Configuration files (e.g., GitHub workflow YAML, Jenkinsfile)
   - Documentation explaining the pipeline design
   - Diagram illustrating the CI/CD workflow (optional but appreciated)

3. **Bug Report**:
   - Detailed documentation of all bugs discovered
   - Prioritization of issues based on severity
   - Recommendations for fixes

4. **README**:
   - Setup instructions
   - Design decisions and rationale
   - Any assumptions made
   - Challenges faced and how you addressed them

## Evaluation Criteria

Your submission will be evaluated based on:

1. **Test Quality and Coverage**:
   - Comprehensiveness of test scenarios
   - Edge case handling
   - Test organization and maintainability

2. **CI/CD Implementation**:
   - Pipeline structure and design
   - Automation effectiveness
   - Security considerations

3. **Bug Discovery**:
   - Number and types of bugs identified
   - Quality of bug documentation
   - Accuracy of root cause analysis

4. **Code Quality**:
   - Clean, readable code
   - Good documentation
   - Best practices followed

5. **Technical Choices**:
   - Appropriate tools and frameworks selection
   - Scalable approach

6. **Completion**:
   - Working solution that fulfills requirements
   - Ability to complete tasks within time constraints

## Getting Started

1. Create a new GitHub repository for your solution
2. Clone this repository and make it accessible to your solution
3. Commit your work regularly to show your progress
4. Submit your repository link upon completion

## Resources

To help you complete this challenge, we have provided the following:

- **API Documentation**: A detailed OpenAPI/Swagger specification is available in the `api-docs` folder
- **Sample Data**: Example request/response payloads can be found in the `data/samples` directory
- **Mock Server**: The repository includes a working API implementation that you can run locally following the setup instructions in the README.md
- **Postman Collection**: Basic API requests are available in the `postman` directory to help you get started

For detailed instructions on using these resources, please refer to the [README.md](./README.md) file.

## Submission

Please email your GitHub repository link to the recruiter you have been in touch with, before the end of the hackathon session.

Good luck and thank you for spending time on this challenge!