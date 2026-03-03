import { BaseEntity } from '@/common/entities/base.entity';

export class Organization extends BaseEntity {
  private name: string;
  private domain: string;

  constructor(name: string, domain: string) {
    super(); // เรียกใช้ constructor ของ BaseEntity เพื่อเจน id, createdAt, updatedAt
    this.name = name;
    this.domain = domain;
  }

  updateName(name: string): void {
    if (!name) throw new Error("Name is required");
    this.name = name;
    this.markUpdated(); // เรียกใช้จาก BaseEntity
  }

  updateDomain(domain: string): void {
    if (!domain.includes('.')) throw new Error("Invalid domain");
    this.domain = domain;
    this.markUpdated();
  }

  getName(): string { return this.name; }
  getDomain(): string { return this.domain; }
}
