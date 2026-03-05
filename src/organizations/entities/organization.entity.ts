/*import { BaseEntity } from '@/common/entities/base.entity';

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
}*/

import { BaseEntity } from '@/common/entities/base.entity';

export class Organization extends BaseEntity {
  private name: string;
  private domain: string;

  constructor(name: string, domain: string) {
    super();

    if (!name || name.trim().length === 0) {
      throw new Error('Organization name is required');
    }

    if (!Organization.isValidDomain(domain)) {
      throw new Error('Invalid domain');
    }

    this.name = name.trim();
    this.domain = domain.toLowerCase();
  }

  updateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Organization name is required');
    }

    this.name = name.trim();
    this.markUpdated();
  }

  updateDomain(domain: string): void {
    if (!Organization.isValidDomain(domain)) {
      throw new Error('Invalid domain');
    }

    this.domain = domain.toLowerCase();
    this.markUpdated();
  }

  getName(): string {
    return this.name;
  }

  getDomain(): string {
    return this.domain;
  }

  toJSON() {
    return {
      id: this.getId(),
      name: this.name,
      domain: this.domain,
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt()
    };
  }

  private static isValidDomain(domain: string): boolean {
    return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
  }
}
