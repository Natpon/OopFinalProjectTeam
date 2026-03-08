# Data Model Documentation

## Overview

ระบบนี้ถูกออกแบบเพื่อจัดการ **Users และ Organizations** โดยผู้ใช้หนึ่งคนสามารถเข้าร่วมหลายองค์กร และองค์กรหนึ่งสามารถมีสมาชิกหลายคนได้

ความสัมพันธ์นี้ถูกจัดการผ่าน entity กลางที่เรียกว่า **Membership**

ดังนั้นโครงสร้างของระบบจะเป็น

User → Membership → Organization

ซึ่งเป็นรูปแบบ **Many-to-Many Relationship with extra attributes**

---

# BaseEntity

`BaseEntity` เป็น abstract class ที่ใช้เป็น parent class สำหรับ entities อื่นในระบบ เพื่อให้ทุก entity มี field พื้นฐานเหมือนกัน

## Properties

| Field | Type | Description |
|------|------|-------------|
| id | string | รหัสเฉพาะของ entity |
| createdAt | Date | วันที่สร้างข้อมูล |
| updatedAt | Date | วันที่แก้ไขล่าสุด |

## Methods

| Method | Description |
|------|-------------|
| markUpdated() | อัปเดตค่า updatedAt เป็นเวลาปัจจุบัน |

## Used By

- User
- Organization

---

# User

`User` แทนข้อมูลของผู้ใช้งานในระบบ

ผู้ใช้สามารถเข้าร่วมหลาย organization ผ่าน membership

## Properties

| Field | Type | Description |
|------|------|-------------|
| email | string | อีเมลของผู้ใช้ |
| fullName | string | ชื่อเต็ม |
| status | UserStatus | สถานะของผู้ใช้ |
| lastLoginAt | Date | เวลาที่ login ล่าสุด |

## Methods

| Method | Description |
|------|-------------|
| updateProfile(name, email) | แก้ไขชื่อและอีเมล |
| activate() | เปิดใช้งาน user |
| suspend() | ระงับ user |
| recordLogin() | บันทึกเวลาที่ login |
| isActive() | ตรวจสอบว่า user active หรือไม่ |

---

# Organization

`Organization` แทนข้อมูลขององค์กรหรือกลุ่มที่ผู้ใช้สามารถเข้าร่วมได้
- รองรับการทำ CRUD สำหรับองค์กร
- สารารถดูสมาชิกทั้งหมดขององค์กร พร้อมข้อมูลผู้ใช้ได้

## Properties

| Field | Type | Description |
|------|------|-------------|
| name | string | ชื่อองค์กร |
| domain | string | domain ขององค์กร เช่น kmitl.ac.th |

## Methods

| Method | Description |
|------|-------------|
| updateName(name) | เปลี่ยนชื่อองค์กร |
| updateDomain(domain) | เปลี่ยน domain |
| isDomainMatch(email) | ตรวจสอบว่า email ของ user อยู่ใน domain ขององค์กรหรือไม่ |

### Example

---

# Membership

`Membership` ใช้จัดการความสัมพันธ์ระหว่าง **User และ Organization**

Membership เก็บข้อมูลเกี่ยวกับการเป็นสมาชิก เช่น role และสถานะของสมาชิก
- เพิ่ม / ลบ / แก้ไข membership ของผู้ใช้ในองค์กร
- สามารถดึงข้อมูล membership ตาม user หรือ orhanization ได้
- ป้องหกันการสร้าง membership ซ้ำ

## Properties

| Field | Type | Description |
|------|------|-------------|
| userId | string | ID ของ user |
| organizationId | string | ID ของ organization |
| role | OrganizationRole | role ของ user ในองค์กร |
| status | MembershipStatus | สถานะสมาชิก |
| joinedAt | Date | วันที่เข้าร่วมองค์กร |

## Methods

| Method | Description |
|------|-------------|
| changeRole(role) | เปลี่ยน role ของสมาชิก |
| activate() | เปิดสถานะสมาชิก |
| suspend() | ระงับสมาชิก |
| leave() | ออกจากองค์กร |
| isAdmin() | ตรวจสอบว่าเป็น admin หรือไม่ |

---

# Enumerations

## UserStatus

สถานะของผู้ใช้งานในระบบ

| Value | Description |
|------|-------------|
| ACTIVE | ผู้ใช้สามารถใช้งานระบบได้ |
| SUSPENDED | ผู้ใช้ถูกระงับการใช้งาน |

---

## OrganizationRole

กำหนด role ของสมาชิกในองค์กร

| Value | Description |
|------|-------------|
| OWNER | เจ้าขององค์กร |
| ADMIN | ผู้ดูแลองค์กร |
| MEMBER | สมาชิกทั่วไป |

---

## MembershipStatus

สถานะของสมาชิกในองค์กร

| Value | Description |
|------|-------------|
| ACTIVE | สมาชิกปกติ |
| SUSPENDED | สมาชิกถูกระงับ |
| LEFT | ออกจากองค์กร |

---

# Relationships

## User → Membership

User หนึ่งคนสามารถมีหลาย membership

---

## Organization → Membership

Organization หนึ่งสามารถมีสมาชิกหลายคน

---

# Design Notes

การใช้ `Membership` เป็น entity กลางช่วยให้สามารถเก็บข้อมูลเพิ่มเติมเกี่ยวกับความสัมพันธ์ระหว่าง User และ Organization ได้ เช่น

- role ของสมาชิก
- สถานะสมาชิก
- วันที่เข้าร่วมองค์กร

รูปแบบนี้เป็น **Many-to-Many Relationship with Attributes**

ซึ่งเป็น pattern ที่ใช้ในระบบจริง เช่น

- Slack
- GitHub
- Discord