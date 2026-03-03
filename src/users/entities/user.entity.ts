import { BaseEntity } from '../../common/entities/base.entity'
import { UserStatus } from '../../common/enums/user-status.enum'

export class User extends BaseEntity {
  email: string
  fullName: string
  status: UserStatus
  lastLoginAt: Date | null

  constructor(id: string, email: string, fullName: string) {
    super(id)
    this.email = email
    this.fullName = fullName
    this.status = UserStatus.ACTIVE
    this.lastLoginAt = null
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