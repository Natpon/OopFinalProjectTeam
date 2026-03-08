// src/membership/membership.module.ts
import { Module, forwardRef } from '@nestjs/common'; // 👈 1. เพิ่ม forwardRef
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { MembershipRepository } from './membership.repository';

// 🌟 2. Import OrganizationModule เข้ามา
import { OrganizationModule } from '@/organization/organization.module';

@Module({
  // 🌟 3. ใส่เข้าไปใน imports โดยใช้ท่า forwardRef
  imports: [forwardRef(() => OrganizationModule)], 
  controllers: [MembershipController],
  providers: [MembershipService, MembershipRepository],
  exports: [MembershipService], 
})
export class MembershipModule {}