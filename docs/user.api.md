# เอกสาร User API

เอกสารนี้อธิบายเฉพาะ endpoint ของ `User` ที่มีการ implement อยู่ใน repository นี้

## Base URL

`http://localhost:3000`

## Base Route

`/user`

## หมายเหตุ

- โปรเจกต์ใช้ NestJS global validation (`ValidationPipe`) โดยเปิด `whitelist`, `forbidNonWhitelisted` และ `transform`
- endpoint ของ User ตอนนี้ส่งกลับเป็น JSON object/array โดยตรง (ยังไม่ได้ครอบด้วยรูปแบบ `success/message/data`)
- ตอนสร้างผู้ใช้ใหม่ รหัสผ่านจะถูก hash และไม่ส่งกลับใน response

## รูปแบบ Error

ระบบใช้รูปแบบ HTTP exception มาตรฐานของ NestJS:

```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

---

## 1) สร้างผู้ใช้

ใช้สำหรับสร้างผู้ใช้ใหม่

### Endpoint

`POST /user`

### Request Body

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secret123",
  "displayName": "John Doe"
}
```

### กฎ Validation

- `username`: string, ยาวอย่างน้อย 3 และไม่เกิน 30
- `email`: ต้องเป็นรูปแบบอีเมลที่ถูกต้อง
- `password`: string, ยาวอย่างน้อย 6
- `displayName`: string, ยาวอย่างน้อย 2 และไม่เกิน 50

### ตัวอย่าง Response (`201`)

```json
{
  "id": "9f3c4a2d-0c32-4db5-9ef6-87fd2bb5bfec",
  "username": "john_doe",
  "email": "john@example.com",
  "displayName": "John Doe",
  "role": "user",
  "status": "active",
  "lastLoginAt": null,
  "createdAt": "2026-03-08T10:00:00.000Z",
  "updatedAt": "2026-03-08T10:00:00.000Z"
}
```

### Error ที่พบบ่อย

- `409 Conflict`: `Email already exists`
- `409 Conflict`: `Username already exists`
- `400 Bad Request`: ข้อมูลไม่ผ่าน validation

---

## 2) ดึงผู้ใช้ทั้งหมด

ดึงรายการผู้ใช้ทั้งหมด และสามารถค้นหาแบบ optional ได้

### Endpoint

`GET /user`

### Query Params

- `search` (ไม่บังคับ): ค้นหาจาก `username`, `displayName` หรือ `email` (ไม่สนใจตัวพิมพ์เล็ก-ใหญ่)

### ตัวอย่าง Request

`GET /user?search=john`

### ตัวอย่าง Response (`200`)

```json
[
  {
    "id": "9f3c4a2d-0c32-4db5-9ef6-87fd2bb5bfec",
    "username": "john_doe",
    "email": "john@example.com",
    "displayName": "John Doe",
    "role": "user",
    "status": "active",
    "lastLoginAt": null,
    "createdAt": "2026-03-08T10:00:00.000Z",
    "updatedAt": "2026-03-08T10:00:00.000Z"
  }
]
```

---

## 3) ดึงผู้ใช้ตาม ID

ดึงข้อมูลผู้ใช้ 1 รายการตาม ID

### Endpoint

`GET /user/:id`

### ตัวอย่าง Response (`200`)

```json
{
  "id": "9f3c4a2d-0c32-4db5-9ef6-87fd2bb5bfec",
  "username": "john_doe",
  "email": "john@example.com",
  "displayName": "John Doe",
  "role": "user",
  "status": "active",
  "lastLoginAt": null,
  "createdAt": "2026-03-08T10:00:00.000Z",
  "updatedAt": "2026-03-08T10:00:00.000Z"
}
```

### Error ที่พบบ่อย

- `404 Not Found`: `User not found`

---

## 4) อัปเดตผู้ใช้ (บางส่วน)

อัปเดตข้อมูลผู้ใช้บาง field

### Endpoint

`PATCH /user/:id`

### Request Body (ทุก field ไม่บังคับ)

```json
{
  "displayName": "John D.",
  "avatarUrl": "https://example.com/avatar.png",
  "phoneNumber": "+66-99-123-4567"
}
```

### Field ที่อนุญาต

- `username`
- `email`
- `password`
- `displayName`
- `avatarUrl`
- `phoneNumber`

### ตัวอย่าง Response (`200`)

```json
{
  "id": "9f3c4a2d-0c32-4db5-9ef6-87fd2bb5bfec",
  "username": "john_doe",
  "email": "john@example.com",
  "displayName": "John D.",
  "role": "user",
  "status": "active",
  "avatarUrl": "https://example.com/avatar.png",
  "phoneNumber": "+66-99-123-4567",
  "lastLoginAt": null,
  "createdAt": "2026-03-08T10:00:00.000Z",
  "updatedAt": "2026-03-08T10:10:00.000Z"
}
```

### Error ที่พบบ่อย

- `404 Not Found`: `User not found`
- `409 Conflict`: `email` หรือ `username` ซ้ำ

---

## 5) ลบผู้ใช้

ลบผู้ใช้ตาม ID

### Endpoint

`DELETE /user/:id`

### ตัวอย่าง Response (`200`)

ไม่มี response body (`void`)

### Error ที่พบบ่อย

- `404 Not Found`: `User not found`

---

## วิธีรันแบบเร็ว

```bash
npm install
npm run start:dev
```

Swagger UI: `http://localhost:3000/api`
