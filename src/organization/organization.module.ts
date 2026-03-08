import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { OrganizationRepository } from './organization.repository'; // <-- 1. Import it

@Module({
  controllers: [OrganizationController],
  providers: [
    OrganizationService, 
    OrganizationRepository // <-- 2. Add it to providers
  ],
  exports: [OrganizationService]
})
export class OrganizationModule {}