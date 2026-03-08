// src/membership/membership.module.ts
import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { MembershipRepository } from './membership.repository';


@Module({
  
  controllers: [MembershipController],
  providers: [MembershipService, MembershipRepository],
  exports: [MembershipService], 
})
export class MembershipModule {}