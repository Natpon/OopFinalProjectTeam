// src/membership/membership.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Controller() 
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('memberships')
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipService.create(createMembershipDto);
  }

  @Get('organizations/:id/members')
  listOrganizationMembers(@Param('id') id: string) {
    return this.membershipService.listOrganizationMembers(id);
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