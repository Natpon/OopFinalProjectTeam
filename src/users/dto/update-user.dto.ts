import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { UserStatus } from '@/common/enums/user-status.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}