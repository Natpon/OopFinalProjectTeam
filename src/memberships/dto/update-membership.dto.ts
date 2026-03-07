import { IsEnum, IsOptional } from 'class-validator';
import { OrganizationRole } from '../../common/enums/organization-role.enum';
import { MembershipStatus } from '../../common/enums/membership-status.enum';

export class UpdateMembershipDto {
  @IsOptional()
  @IsEnum(OrganizationRole)
  role?: OrganizationRole;

  @IsOptional()
  @IsEnum(MembershipStatus)
  status?: MembershipStatus;
}