// organization/entities/organization.entity.ts

import { BaseEntity } from '../../common/entities/base.entity';
import { OrganizationStatus } from '../enums/organization-status.enum';

export class Organization extends BaseEntity {
  name!: string;
  domain!: string;
  ownerId!: string;
  email!: string;
  phone!: string;
  address!: string;
  plan!: string;
  status!: OrganizationStatus;

  constructor(partial: Partial<Organization>) {
    super(); // initializes id, createdAt, updatedAt
    Object.assign(this, partial);
  }

  update(partial: Partial<Organization>): void {
    Object.assign(this, partial);
    this.markUpdated(); // from BaseEntity
  }
}
