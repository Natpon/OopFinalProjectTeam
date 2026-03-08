# NestJS Users API

Simple REST API built with NestJS for managing users.

---

# Project Overview

This project provides a RESTful API to manage users including:

* Create users
* Retrieve users
* Update users
* Delete users

The API follows standard REST conventions and returns responses in a consistent format.

---

# Tech Stack

* Node.js
* NestJS
* TypeScript

---

# Installation

Clone the repository

```
git clone <repository-url>
```

Install dependencies

```
npm install
```

Run the server

```
npm run start
```

For development mode

```
npm run start:dev
```

---

# Base URL

```
http://localhost:3000
```

---

# Response Format

All API responses follow this structure.

```json
{
  "success": true,
  "message": "string",
  "data": {}
}
```

| Field   | Type    | Description                             |
| ------- | ------- | --------------------------------------- |
| success | boolean | Indicates if the request was successful |
| message | string  | Description of the result               |
| data    | any     | Response payload                        |

---

# Error Response

Example error response.

```json
{
  "statusCode": 404,
  "message": "User with id 1 not found",
  "error": "Not Found"
}
```

Common HTTP status codes.

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Created               |
| 400         | Bad request           |
| 404         | Resource not found    |
| 500         | Internal server error |

---

# Users API

Base route

```
/users
```

---

# Get All Users

Retrieve all users.

### Endpoint

```
GET /users
```

### Example Request

```
curl -X GET http://localhost:3000/users
```

### Response

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```

---

# Get User by ID

Retrieve a specific user.

### Endpoint

```
GET /users/:id
```

### Example Request

```
curl -X GET http://localhost:3000/users/1
```

### Response

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

# Create User

Create a new user.

### Endpoint

```
POST /users
```

### Example Request

```
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com"
}'
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Response

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

# Update User

Update a user completely.

### Endpoint

```
PUT /users/:id
```

### Example Request

```
curl -X PUT http://localhost:3000/users/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "Updated Name",
  "email": "updated@example.com"
}'
```

### Response

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "1",
    "name": "Updated Name",
    "email": "updated@example.com"
  }
}
```

---

# Partially Update User

Update specific fields of a user.

### Endpoint

```
PATCH /users/:id
```

### Example Request

```
curl -X PATCH http://localhost:3000/users/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "Updated Name"
}'
```

### Response

```json
{
  "success": true,
  "message": "User partially updated successfully",
  "data": {
    "id": "1",
    "name": "Updated Name",
    "email": "john@example.com"
  }
}
```

---

# Delete User

Delete a user.

### Endpoint

```
DELETE /users/:id
```

### Example Request

```
curl -X DELETE http://localhost:3000/users/1
```

### Response

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

---

# Project Structure

```
src
 ├── users
 │   ├── dto
 │   │   ├── create-user.dto.ts
 │   │   └── update-user.dto.ts
 │   │
 │   ├── entities
 │   │   └── user.entity.ts
 │   │
 │   ├── users.controller.ts
 │   └── users.service.ts
 │
 ├── common
 │   └── interfaces
 │       └── api-response.interface.ts
 │
 └── main.ts
```

---

# Running the Application

Start the application

```
npm run start
```

Development mode

```
npm run start:dev
```

Build the project

```
npm run build
```

---

# Author

Backend API built with NestJS.
