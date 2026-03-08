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
- หลาย endpoint ส่งกลับเป็น object/array โดยตรง (ไม่ได้ครอบด้วย `success/message/data`)
- Error format ใช้รูปแบบมาตรฐานของ NestJS

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

## 2) ดึงผู้ใช้ทั้งหมด

- Endpoint: `GET /user`
- Query (optional): `search`

## 3) ดึงผู้ใช้ตาม ID

- Endpoint: `GET /user/:id`
- Error ที่พบบ่อย: `404 Not Found` (`User not found`)

## 4) อัปเดตผู้ใช้ (บางส่วน)

- Endpoint: `PATCH /user/:id`
- Field ที่อัปเดตได้:
- `username`, `email`, `password`, `displayName`, `avatarUrl`, `phoneNumber`
- Error ที่พบบ่อย:
- `404 Not Found`
- `409 Conflict` (email/username ซ้ำ)

## 5) ลบผู้ใช้

- Endpoint: `DELETE /user/:id`
- สำเร็จแล้วไม่มี response body (`void`)

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

## 2) ดึงองค์กรทั้งหมด

- Endpoint: `GET /organization`

## 3) ดึงองค์กรตาม ID

- Endpoint: `GET /organization/:id`
- Error ที่พบบ่อย: `404 Not Found` (`Organization with ID "<id>" not found.`)

## 4) ดึงสมาชิกขององค์กร

- Endpoint: `GET /organization/:id/members`

## 5) อัปเดตองค์กร (บางส่วน)

- Endpoint: `PATCH /organization/:id`
- Field ที่อัปเดตได้:
- `name`, `domain`, `ownerId`, `email`, `phone`, `address`, `plan`, `status`

## 6) ลบองค์กร

- Endpoint: `DELETE /organization/:id`
- ตัวอย่าง response:

```json
{
  "message": "Organization \"<id>\" has been successfully removed."
}
```

---

# Membership API

## Base Route

- `/memberships`
- `/organizations/:id/members`

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

## 2) ดึงสมาชิกทั้งหมดขององค์กร

- Endpoint: `GET /organizations/:id/members`

## 3) อัปเดตสมาชิก (บางส่วน)

- Endpoint: `PATCH /memberships/:id`
- Field ที่อัปเดตได้:
- `userId`, `organizationId`, `role`, `status`, `invitedBy`, `permissions`
- Error ที่พบบ่อย:
- `404 Not Found` (`Membership with ID "<id>" not found.`)

## 4) ลบสมาชิก

- Endpoint: `DELETE /memberships/:id`
- ตัวอย่าง response:

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
