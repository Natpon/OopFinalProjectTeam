# เอกสาร API รวม

เอกสารนี้รวม endpoint ของทั้ง 3 โมดูลในโปรเจกต์:

- User
- Organization
- Membership

## Base URL

`http://localhost:3000`

## Swagger

`http://localhost:3000/api`

## หมายเหตุร่วม

- ระบบใช้ NestJS global validation (`ValidationPipe`) พร้อม `whitelist`, `forbidNonWhitelisted`, `transform`
- ส่วนใหญ่ endpoint ส่งกลับในรูปแบบ `ApiResponse`:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* ... */ }
}
```

- Error format ใช้รูปแบบมาตรฐานของ NestJS:

```json
{
  "statusCode": 404,
  "message": "Not Found",
  "error": "Not Found"
}
```

---

# User API

## Base Route

`/user`

## 1) สร้างผู้ใช้

- Endpoint: `POST /user`
- Validation หลัก:
  - `username`: string, 3-30 ตัวอักษร
  - `email`: อีเมลที่ถูกต้อง
  - `password`: string, อย่างน้อย 6
  - `displayName`: string, 2-50 ตัวอักษร
- Error ที่พบบ่อย:
  - `409 Conflict`: `Email already exists`
  - `409 Conflict`: `Username already exists`

ตัวอย่าง Request:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secret123",
  "displayName": "John Doe"
}
```

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "b1b82c31-9f4e-4a6b-8c2d-3d5e7f9a1b2c",
    "username": "john_doe",
    "email": "john@example.com",
    "displayName": "John Doe"
  }
}
```

## 2) ดึงผู้ใช้ทั้งหมด

- Endpoint: `GET /user`
- Query (optional): `search`

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "b1b82c31-9f4e-4a6b-8c2d-3d5e7f9a1b2c",
      "username": "john_doe",
      "email": "john@example.com",
      "displayName": "John Doe"
    }
  ]
}
```

## 3) ดึงผู้ใช้ตาม ID

- Endpoint: `GET /user/:id`
- Error ที่พบบ่อย: `404 Not Found` (`User not found`)

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "b1b82c31-9f4e-4a6b-8c2d-3d5e7f9a1b2c",
    "username": "john_doe",
    "email": "john@example.com",
    "displayName": "John Doe"
  }
}
```

## 4) แทนที่ผู้ใช้ทั้งหมด (Full Replace)

- Endpoint: `PUT /user/:id`
- Field ที่ต้องส่ง: `username`, `email`, `password`, `displayName`
- Error ที่พบบ่อย:
  - `404 Not Found`
  - `409 Conflict` (email/username ซ้ำ)

## 5) อัปเดตผู้ใช้ (บางส่วน)

- Endpoint: `PATCH /user/:id`
- Field ที่อัปเดตได้:
  - `username`, `email`, `password`, `displayName`, `avatarUrl`, `phoneNumber`
- Error ที่พบบ่อย:
  - `404 Not Found`
  - `409 Conflict` (email/username ซ้ำ)

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "b1b82c31-9f4e-4a6b-8c2d-3d5e7f9a1b2c",
    "username": "john_doe",
    "email": "john@example.com",
    "displayName": "John Doe Updated"
  }
}
```

## 6) ลบผู้ใช้

- Endpoint: `DELETE /user/:id`

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": null
}
```

---

# Organization API

## Base Route

`/organization`

## 1) สร้างองค์กร

- Endpoint: `POST /organization`
- Validation หลัก:
  - `name`: string และห้ามว่าง
  - `domain`: string
  - `ownerId`: UUID
  - `email`: อีเมลที่ถูกต้อง
  - `phone`: string
  - `address`: string
  - `plan`: string
  - `status`: enum `OrganizationStatus`

ค่า `status` ที่รองรับ:

- `ACTIVE`
- `INACTIVE`
- `SUSPENDED`
- `PENDING`

ตัวอย่าง Request:

```json
{
  "name": "TechNova",
  "domain": "technova.io",
  "ownerId": "b1b82c31-9f4e-4a6b-8c2d-3d5e7f9a1b2c",
  "email": "hello@technova.io",
  "phone": "+1-415-555-0198",
  "address": "Market St, San Francisco, CA, USA",
  "plan": "pro",
  "status": "ACTIVE"
}
```

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "Organization created successfully",
  "data": {
    "id": "d71f6a2b-8c4e-4f3b-9d1a-6e5c8f2b7a3d",
    "name": "TechNova",
    "domain": "technova.io",
    "ownerId": "b1b82c31-9f4e-4a6b-8c2d-3d5e7f9a1b2c",
    "email": "hello@technova.io",
    "phone": "+1-415-555-0198",
    "address": "Market St, San Francisco, CA, USA",
    "plan": "pro",
    "status": "ACTIVE"
  }
}
```

## 2) ดึงองค์กรทั้งหมด

- Endpoint: `GET /organization`

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "Organizations retrieved successfully",
  "data": [
    {
      "id": "d71f6a2b-8c4e-4f3b-9d1a-6e5c8f2b7a3d",
      "name": "TechNova",
      "domain": "technova.io",
      "plan": "pro",
      "status": "ACTIVE"
    }
  ]
}
```

## 3) ดึงองค์กรตาม ID

- Endpoint: `GET /organization/:id`
- Error ที่พบบ่อย: `404 Not Found` (`Organization with ID "<id>" not found.`)

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "Organization retrieved successfully",
  "data": {
    "id": "d71f6a2b-8c4e-4f3b-9d1a-6e5c8f2b7a3d",
    "name": "TechNova",
    "domain": "technova.io",
    "ownerId": "b1b82c31-9f4e-4a6b-8c2d-3d5e7f9a1b2c",
    "email": "hello@technova.io",
    "plan": "pro",
    "status": "ACTIVE"
  }
}
```

## 4) ดึงสมาชิกขององค์กร (พร้อมข้อมูล User แบบ Join)

- Endpoint: `GET /organization/:id/members`
- คำอธิบาย: ดึงข้อมูลสมาชิกทั้งหมดขององค์กร โดยจะทำการ Join ข้อมูล User เข้ามาด้วย

ตัวอย่าง Response:

```json
[
  {
    "id": "membership-id-1",
    "role": "admin",
    "status": "ACTIVE",
    "joinedAt": "2024-01-15T08:30:00.000Z",
    "permissions": ["read", "write", "delete"],
    "user": {
      "id": "b1b82c31-9f4e-4a6b-8c2d-3d5e7f9a1b2c",
      "displayName": "John Doe",
      "email": "john@example.com"
    }
  },
  {
    "id": "membership-id-2",
    "role": "member",
    "status": "ACTIVE",
    "joinedAt": "2024-02-20T10:15:00.000Z",
    "permissions": ["read"],
    "user": {
      "id": "user-id-2",
      "displayName": "Jane Smith",
      "email": "jane@example.com"
    }
  }
]
```

## 5) แทนที่องค์กรทั้งหมด (Full Replace)

- Endpoint: `PUT /organization/:id`
- Field ที่ต้องส่ง: `name`, `domain`, `ownerId`, `email`, `phone`, `address`, `plan`, `status`

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "Organization replaced successfully",
  "data": {
    "id": "d71f6a2b-8c4e-4f3b-9d1a-6e5c8f2b7a3d",
    "name": "TechNova Updated",
    "domain": "technova.io",
    "plan": "enterprise"
  }
}
```

## 6) อัปเดตองค์กร (บางส่วน)

- Endpoint: `PATCH /organization/:id`
- Field ที่อัปเดตได้:
  - `name`, `domain`, `ownerId`, `email`, `phone`, `address`, `plan`, `status`

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "Organization updated successfully",
  "data": {
    "id": "d71f6a2b-8c4e-4f3b-9d1a-6e5c8f2b7a3d",
    "name": "TechNova",
    "plan": "enterprise"
  }
}
```

## 7) ลบองค์กร

- Endpoint: `DELETE /organization/:id`

ตัวอย่าง Response:

```json
{
  "success": true,
  "message": "Organization \"<id>\" has been successfully removed.",
  "data": null
}
```

---

# Membership API

## Base Route

- `/memberships`

## 1) เพิ่มสมาชิกเข้าองค์กร

- Endpoint: `POST /memberships`
- Validation หลัก:
  - `userId`: UUID และห้ามว่าง
  - `organizationId`: UUID และห้ามว่าง
  - `role`: enum `MembershipRole`
  - `status`: string (optional)
  - `invitedBy`: UUID (optional)
  - `permissions`: string[] (optional)
- Rule สำคัญ:
  - ถ้า `userId + organizationId` ซ้ำ จะตอบ `409 Conflict`

ค่า `role` ที่รองรับ:

- `owner`
- `admin`
- `member`
- `guest`

ตัวอย่าง Request:

```json
{
  "userId": "b1b82c31-9f4e-4a6b-8c2d-3d5e7f9a1b2c",
  "organizationId": "d71f6a2b-8c4e-4f3b-9d1a-6e5c8f2b7a3d",
  "role": "member",
  "status": "ACTIVE",
  "invitedBy": "a6a37b86-4c9d-4f1a-d17c-8c0d2e4f6a7b",
  "permissions": ["read"]
}
```

## 2) ดึงองค์กรทั้งหมดที่ User เป็นสมาชิก (พร้อมข้อมูล Organization แบบ Join)

- Endpoint: `GET /memberships/user/:userId`
- คำอธิบาย: ดึงข้อมูลว่า User คนนี้เป็นสมาชิกของบริษัทไหนบ้าง โดยจะทำการ Join ข้อมูล Organization เข้ามาด้วย

ตัวอย่าง Response:

```json
[
  {
    "id": "membership-id-1",
    "role": "admin",
    "status": "ACTIVE",
    "joinedAt": "2024-01-15T08:30:00.000Z",
    "organization": {
      "id": "d71f6a2b-8c4e-4f3b-9d1a-6e5c8f2b7a3d",
      "name": "TechNova",
      "domain": "technova.io",
      "plan": "pro"
    }
  },
  {
    "id": "membership-id-2",
    "role": "member",
    "status": "ACTIVE",
    "joinedAt": "2024-02-20T10:15:00.000Z",
    "organization": {
      "id": "org-id-2",
      "name": "StartupHub",
      "domain": "startuphub.com",
      "plan": "free"
    }
  }
]
```

## 3) อัปเดตสมาชิก (บางส่วน)

- Endpoint: `PATCH /memberships/:id`
- Field ที่อัปเดตได้:
  - `userId`, `organizationId`, `role`, `status`, `invitedBy`, `permissions`
- Error ที่พบบ่อย:
  - `404 Not Found` (`Membership with ID "<id>" not found.`)

## 4) ลบสมาชิก

- Endpoint: `DELETE /memberships/:id`

ตัวอย่าง Response:

```json
{
  "message": "Membership \"<id>\" successfully removed."
}
```

---

## Quick Start

```bash
npm install
npm run start:dev
```
