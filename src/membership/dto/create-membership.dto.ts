
import { IsUUID, IsString, IsOptional, IsArray, IsNotEmpty, IsEnum } from 'class-validator';
import { MembershipRole } from '../enums/membership-role.enum';

export class CreateMembershipDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsUUID()
  @IsNotEmpty()
  organizationId!: string;

  @IsEnum(MembershipRole)
  @IsNotEmpty()
  role!: MembershipRole;

  @IsString()
  @IsOptional()
  status?: string;

  @IsUUID()
  @IsOptional()
  invitedBy?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];
}