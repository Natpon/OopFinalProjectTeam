import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base-entity.entity'; // ดึงจากไฟล์เดิมที่คุณไม่อยากแก้

@Entity('organizations')
export class Organization extends BaseEntity {
  @Column()
  private name: string;

  @Column()
  private domain: string;

  // --- Methods ตาม Business Rules ใน UML ---

  updateName(name: string): void {
    if (!name || name.trim() === '') throw new Error("Name is required");
    this.name = name;
    // เรียกใช้ markUpdated() ถ้าใน BaseEntity มี (ถ้าไม่มีให้ลบบรรทัดนี้ออก)
  }

  updateDomain(domain: string): void {
    if (!domain || !domain.includes('.')) throw new Error("Invalid domain format");
    this.domain = domain;
  }

  isDomainMatch(email: string): boolean {
    if (!email) return false;
    return email.endsWith(`@${this.domain}`);
  }

  // Getter สำหรับดึงค่า private ไปแสดงผล
  getName(): string { return this.name; }
  getDomain(): string { return this.domain; }
}

