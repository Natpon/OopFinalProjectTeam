// organization/organization.module.ts

import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationService], // export if other modules need it
})
export class OrganizationModule {}
