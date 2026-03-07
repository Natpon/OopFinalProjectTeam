import { BaseEntity } from '@/common/entities/base.entity';
import { OrganizationRole } from '../../common/enums/organization-role.enum';
import { MembershipStatus } from '../../common/enums/membership-status.enum';

interface MembershipProps {
  userId: string;
  organizationId: string;
  role?: OrganizationRole;
  status?: MembershipStatus;
}

export class Membership extends BaseEntity {
  private userId: string;
  private organizationId: string;
  private role: OrganizationRole;
  private status: MembershipStatus;

  constructor(props: MembershipProps) {
    super();

    if (!props.userId) {
      throw new Error('userId is required');
    }

    if (!props.organizationId) {
      throw new Error('organizationId is required');
    }

    this.userId = props.userId;
    this.organizationId = props.organizationId;
    this.role = props.role ?? OrganizationRole.MEMBER;
    this.status = props.status ?? MembershipStatus.ACTIVE;
  }

  getUserId(): string {
    return this.userId;
  }

  getOrganizationId(): string {
    return this.organizationId;
  }

  getRole(): OrganizationRole {
    return this.role;
  }

  getStatus(): MembershipStatus {
    return this.status;
  }

  changeRole(role: OrganizationRole): void {
    this.role = role;
    this.markUpdated();
  }

  suspend(): void {
    this.status = MembershipStatus.SUSPENDED;
    this.markUpdated();
  }

  activate(): void {
    this.status = MembershipStatus.ACTIVE;
    this.markUpdated();
  }

  leave(): void {
    this.status = MembershipStatus.LEFT;
    this.markUpdated();
  }
}