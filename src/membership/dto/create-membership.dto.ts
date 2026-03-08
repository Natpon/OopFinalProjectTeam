// src/membership/dto/create-membership.dto.ts
import { IsUUID, IsString, IsOptional, IsArray, IsNotEmpty, IsEnum } from 'class-validator';
import { MembershipRole } from '../enums/membership-role.enum';

export class CreateMembershipDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string; // <-- Added !

  @IsUUID()
  @IsNotEmpty()
  organizationId!: string; // <-- Added !

  @IsEnum(MembershipRole)
  @IsNotEmpty()
  role!: MembershipRole; // <-- Added ! AND changed from string to MembershipRole

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