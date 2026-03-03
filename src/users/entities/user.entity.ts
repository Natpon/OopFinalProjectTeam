import { BaseEntity } from '@/common/entities/base.entity';
import { UserStatus } from '@/common/enums/user-status.enum'

export class User extends BaseEntity {
    private email: string;
    private fullName: string;
    private status: UserStatus;
    private lastLoginAt: Date | null;

    constructor(params: {
        id: string;
        email: string;
        fullName: string;
        status?: UserStatus;
    }) {
        super();

        this.email = params.email;
        this.fullName = params.fullName;
        this.status = params.status ?? UserStatus.ACTIVE;
        this.lastLoginAt = null;
    }

  updateProfile(name: string, email: string): void {
    this.fullName = name
    this.email = email
    this.markUpdated()
  }

  activate(): void {
    this.status = UserStatus.ACTIVE
  }

  suspend(): void {
    this.status = UserStatus.SUSPENDED
  }

  recordLogin(): void {
    this.lastLoginAt = new Date()
  }

  isActive(): boolean {
    return this.status === UserStatus.ACTIVE
  }
}