
import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationRepository } from './organization.repository';
import { forwardRef } from '@nestjs/common';
import { MembershipModule } from '@/membership/membership.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [forwardRef(() => MembershipModule), forwardRef(() => UserModule)],
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    OrganizationRepository
  ],
  exports: [OrganizationService]
})
export class OrganizationModule { }