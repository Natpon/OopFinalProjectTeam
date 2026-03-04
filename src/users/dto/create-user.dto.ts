import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { UserStatus } from '@/common/enums/user-status.enum';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  fullName!: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}