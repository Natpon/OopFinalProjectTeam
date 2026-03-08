
import { BaseEntity } from '../../common/entities/base.entity';
import { MembershipRole } from '../enums/membership-role.enum';


export class Membership extends BaseEntity {
  userId!: string;
  organizationId!: string;
  role!: MembershipRole;
  status: string = 'ACTIVE';

  joinedAt: Date = new Date();
  invitedBy?: string;
  permissions?: string[];

  constructor(partial: Partial<Membership> = {}) {
    super();
    Object.assign(this, partial);

    if (partial.joinedAt) this.joinedAt = new Date(partial.joinedAt);
    if (partial.createdAt) (this as any).createdAt = new Date(partial.createdAt);
    if (partial.updatedAt) this.updatedAt = new Date(partial.updatedAt);
  }

  update(partial: Partial<Membership>): void {
    Object.assign(this, partial);
    this.markUpdated();
  }
}