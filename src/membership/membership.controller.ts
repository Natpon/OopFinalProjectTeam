// src/membership/membership.controller.ts
import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { ApiResponse } from '../common/interfaces/api-response.interface';

@Controller() 
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post('memberships')
  async create(@Body() createMembershipDto: CreateMembershipDto): Promise<ApiResponse<any>> {
    const data = await this.membershipService.create(createMembershipDto);
    return {
      success: true,
      message: 'Membership created successfully',
      data,
    };
  }

  @Get('organizations/:id/members')
  async listOrganizationMembers(@Param('id') id: string): Promise<ApiResponse<any[]>> {
    const data = await this.membershipService.listOrganizationMembers(id);
    return {
      success: true,
      message: 'Organization members retrieved successfully',
      data,
    };
  }

  @Put('memberships/:id')
  async replace(@Param('id') id: string, @Body() createMembershipDto: CreateMembershipDto): Promise<ApiResponse<any>> {
    const data = await this.membershipService.update(id, createMembershipDto);
    return {
      success: true,
      message: 'Membership replaced successfully',
      data,
    };
  }

  @Patch('memberships/:id')
  async update(@Param('id') id: string, @Body() updateMembershipDto: UpdateMembershipDto): Promise<ApiResponse<any>> {
    const data = await this.membershipService.update(id, updateMembershipDto);
    return {
      success: true,
      message: 'Membership updated successfully',
      data,
    };
  }

  @Delete('memberships/:id')
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    const result = await this.membershipService.remove(id);
    return {
      success: true,
      message: result.message,
      data: null,
    };
  }
}