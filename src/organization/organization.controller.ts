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

// 🌟 1. Import MembershipService เข้ามา
import { MembershipService } from '../membership/membership.service'; 

@Controller('organization')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    // 🌟 2. Inject MembershipService เข้ามาใช้งาน
    private readonly membershipService: MembershipService, 
    // 🌟 3. Inject UserService เข้ามาใช้งาน
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  // 🌟 3. เพิ่ม Endpoint สำหรับดึงสมาชิกขององค์กร
  /*@Get(':id/members')
  async getMembers(@Param('id') id: string) {
    console.log(`fetching members for organization: ${id}`);
    
    // โยน organizationId ไปให้ MembershipService จัดการค้นหา
    const members = await this.membershipService.listOrganizationMembers(id);
    return members;
  }*/

    // สมมติว่าเป็นโค้ดใน OrganizationController
  // สมมติว่าเป็นโค้ดใน OrganizationController

@Get(':id/members')
async getMembers(@Param('id') id: string) {
  // 1. ดึงข้อมูล Membership มาก่อน (ได้มา 4 ก้อนที่มีแค่ userId)
  const memberships = await this.membershipService.listOrganizationMembers(id);
  
  // 2. เริ่มกระบวนการ Join (ประกอบร่าง)
  const result = await Promise.all(
    memberships.map(async (member) => {
      // 2.1 เอา userId ของแต่ละคน ไปค้นหาชื่อและอีเมลใน UserService
      const userInfo = await this.userService.findOne(member.userId);
      
      // 2.2 คืนค่าก้อนข้อมูลใหม่ ที่เอาข้อมูล Member เดิม มาผสมกับข้อมูล User
      return {
        id: member.id,
        role: member.role,
        status: member.status,
        joinedAt: member.joinedAt,
        permissions: member.permissions,
        user: { // 👈 สร้างก้อน user แทรกเข้าไปตรงนี้!
          id: userInfo.id,
          displayName: userInfo.displayName,
          email: userInfo.email
        }
      };
    })
  );

  // 3. ส่งข้อมูลที่ประกอบร่างเสร็จแล้ว กลับไปให้คนที่ยิง API
  return result; 
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
