// src/organization/organization.module.ts
import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationRepository } from './organization.repository'; 

import { MembershipModule } from '@/membership/membership.module';
// 🌟 1. เพิ่ม Import UserModule เข้ามาตรงนี้
import { UserModule } from '@/user/user.module'; 

@Module({
  // 🌟 2. เอา UserModule มาใส่ใน array นี้ด้วยครับ
  imports: [MembershipModule, UserModule], 
  controllers: [OrganizationController],
  providers: [
    OrganizationService, 
    OrganizationRepository 
  ],
  exports: [OrganizationService]
})
export class OrganizationModule {}