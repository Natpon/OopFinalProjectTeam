import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrganizationRole } from '../../common/enums/organization-role.enum';
import { MembershipStatus } from '../../common/enums/membership-status.enum';

export class CreateMembershipDto {
  @IsString()
  userId!: string;

  @IsString()
  organizationId!: string;

  @IsOptional()
  @IsEnum(OrganizationRole)
  role?: OrganizationRole;

  @IsOptional()
  @IsEnum(MembershipStatus)
  status?: MembershipStatus;
}