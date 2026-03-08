
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, forwardRef } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { OrganizationService } from '@/organization/organization.service';

@Controller()
export class MembershipController {
  constructor(
    private readonly membershipService: MembershipService,
    @Inject(forwardRef(() => OrganizationService))
    private readonly organizationService: OrganizationService,
  ) { }

  @Get('memberships/user/:userId')
  async getUserMemberships(@Param('userId') userId: string) {
    const memberships = await this.membershipService.findByUser(userId);
    const result = await Promise.all(
      memberships.map(async (member) => {
        const orgInfo = await this.organizationService.findOne(member.organizationId);

        return {
          id: member.id,
          role: member.role,
          status: member.status,
          joinedAt: member.joinedAt,
          organization: {
            id: orgInfo.id,
            name: orgInfo.name,
            domain: orgInfo.domain,
            plan: orgInfo.plan
          }
        };
      })
    );

    return result;
  }
  @Post('memberships')
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipService.create(createMembershipDto);
  }
  @Patch('memberships/:id')
  update(@Param('id') id: string, @Body() updateMembershipDto: UpdateMembershipDto) {
    return this.membershipService.update(id, updateMembershipDto);
  }

  @Delete('memberships/:id')
  remove(@Param('id') id: string) {
    return this.membershipService.remove(id);
  }


}