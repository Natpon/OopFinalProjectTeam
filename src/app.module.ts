import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [OrganizationModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}