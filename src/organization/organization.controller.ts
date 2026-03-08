// organization/organization.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { UserService } from '@/user/user.service';
import { ApiResponse } from '@/common/interfaces/api-response.interface';
import { MembershipService } from '../membership/membership.service'; 

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly membershipService: MembershipService, 
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<ApiResponse<Organization[]>> {
    const data = await this.organizationService.findAll();
    return {
      success: true,
      message: 'Organizations retrieved successfully',
      data,
    };
  }

  
@Get(':id/members')
async getMembers(@Param('id') id: string) {
  const memberships = await this.membershipService.listOrganizationMembers(id);
  const result = await Promise.all(
    memberships.map(async (member) => {
      const userInfo = await this.userService.findOne(member.userId);
      
      
      return {
        id: member.id,
        role: member.role,
        status: member.status,
        joinedAt: member.joinedAt,
        permissions: member.permissions,
        user: { 
          id: userInfo.id,
          displayName: userInfo.displayName,
          email: userInfo.email
        }
      };
    })
  );

  
  return result; 
}

 
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Organization>> {
    const data = await this.organizationService.findOne(id);
    return {
      success: true,
      message: 'Organization retrieved successfully',
      data,
    };
  }

  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<ApiResponse<Organization>> {
    const data = await this.organizationService.create(createOrganizationDto);
    return {
      success: true,
      message: 'Organization created successfully',
      data,
    };
  }

  
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<ApiResponse<Organization>> {
    const data = await this.organizationService.update(id, updateOrganizationDto);
    return {
      success: true,
      message: 'Organization updated successfully',
      data,
    };
  }

  
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
    const result = await this.organizationService.remove(id);
    return {
      success: true,
      message: result.message,
      data: null,
    };
  }
}