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
import { ApiResponse } from '../common/interfaces/api-response.interface';

// 🌟 1. Import MembershipService เข้ามา
import { MembershipService } from '../membership/membership.service'; 

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    // 🌟 2. Inject MembershipService เข้ามาใช้งาน
    private readonly membershipService: MembershipService, 
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

  // 🌟 3. เพิ่ม Endpoint สำหรับดึงสมาชิกขององค์กร
  @Get(':id/members')
  async getMembers(@Param('id') id: string): Promise<ApiResponse<any[]>> {
    console.log(`fetching members for organization: ${id}`);
    
    // โยน organizationId ไปให้ MembershipService จัดการค้นหา
    const data = await this.membershipService.listOrganizationMembers(id);
    return {
      success: true,
      message: 'Organization members retrieved successfully',
      data,
    };
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

  /**
   * POST /organizations
   * Creates a new organization.
   */
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

  /**
   * PATCH /organizations/:id
   * Partially updates an existing organization.
   */
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

  /**
   * DELETE /organizations/:id
   * Removes an organization by ID.
   */
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
