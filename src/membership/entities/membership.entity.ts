// src/membership/entities/membership.entity.ts
import { BaseEntity } from '../../common/entities/base.entity';
import { MembershipRole } from '../enums/membership-role.enum';
// Assuming you have a MembershipStatus enum, import it here:
// import { MembershipStatus } from '../enums/membership-status.enum';

export class Membership extends BaseEntity {
  userId!: string;
  organizationId!: string;
  role!: MembershipRole;
  
  // If status is an enum, do this (remove the !):
  // status: MembershipStatus = MembershipStatus.ACTIVE;
  // If it's just a string, do this:
  status: string = 'ACTIVE'; 
  
  joinedAt: Date = new Date();
  invitedBy?: string;
  permissions?: string[];

  constructor(partial: Partial<Membership> = {}) {
    super(); 
    Object.assign(this, partial);

    if (partial.joinedAt) this.joinedAt = new Date(partial.joinedAt);
    
    // Bypass 'readonly' constraint for rehydration from JSON using 'as any'
    if (partial.createdAt) (this as any).createdAt = new Date(partial.createdAt);
    if (partial.updatedAt) this.updatedAt = new Date(partial.updatedAt);
  }

  update(partial: Partial<Membership>): void {
    Object.assign(this, partial);
    this.markUpdated(); 
  }
}