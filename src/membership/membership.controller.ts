// src/membership/membership.controller.ts
/*import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  /*@Get('organizations/:id/members')
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
}*/
// src/membership/membership.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, forwardRef } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

// 🌟 1. Import OrganizationService
import { OrganizationService } from '@/organization/organization.service';

@Controller() 
export class MembershipController {
  constructor(
    private readonly membershipService: MembershipService,
    // 🌟 2. Inject OrganizationService เข้ามาใช้งาน (ต้องใช้ forwardRef คู่กันด้วย)
    @Inject(forwardRef(() => OrganizationService))
    private readonly organizationService: OrganizationService,
  ) {}

  // 🌟 3. เพิ่ม Endpoint สำหรับดูว่า "User คนนี้ทำงานที่บริษัทไหนบ้าง"
  @Get('memberships/user/:userId')
  async getUserMemberships(@Param('userId') userId: string) {
    // 3.1 ดึงประวัติว่าคนนี้มีกี่บัตรพนักงาน (ใช้ findByUser)
    const memberships = await this.membershipService.findByUser(userId);

    // 3.2 ทำการ Join เอาข้อมูลบริษัทมาแปะ
    const result = await Promise.all(
      memberships.map(async (member) => {
        // ไปค้นหาข้อมูลบริษัทจาก ID
        const orgInfo = await this.organizationService.findOne(member.organizationId);
        
        return {
          id: member.id,
          role: member.role,
          status: member.status,
          joinedAt: member.joinedAt,
          organization: { // 👈 ประกอบร่างเอาข้อมูลบริษัทใส่เข้าไป
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

  // ... โค้ด create, update, remove ด้านล่างปล่อยไว้เหมือนเดิมครับ
}