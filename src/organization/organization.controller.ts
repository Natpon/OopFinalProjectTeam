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
  async findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  // 🌟 3. เพิ่ม Endpoint สำหรับดึงสมาชิกขององค์กร
  @Get(':id/members')
  async getMembers(@Param('id') id: string) {
    console.log(`fetching members for organization: ${id}`);
    
    // โยน organizationId ไปให้ MembershipService จัดการค้นหา
    const members = await this.membershipService.listOrganizationMembers(id);
    return members;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(id);
  }

  /**
   * POST /organizations
   * Creates a new organization.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationService.create(createOrganizationDto);
  }

  /**
   * PATCH /organizations/:id
   * Partially updates an existing organization.
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  /**
   * DELETE /organizations/:id
   * Removes an organization by ID.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.organizationService.remove(id);
  }
}
