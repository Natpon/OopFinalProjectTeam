import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  displayName: string;

  role: UserRole;
  status: UserStatus;

  avatarUrl?: string;
  phoneNumber?: string;

  lastLoginAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}