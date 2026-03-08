import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { MembershipModule } from './membership/membership.module';

@Module({
  imports: [OrganizationModule, UserModule, MembershipModule],
  controllers: [],
  providers: [],
})
export class AppModule {}