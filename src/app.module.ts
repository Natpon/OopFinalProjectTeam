/*import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { MembershipsModule } from './memberships/memberships.module';

@Module({
  imports: [UsersModule, OrganizationsModule, MembershipsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}*/
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
//import { OrganizationsModule } from './organizations/organizations.module';
import { MembershipsModule } from './memberships/memberships.module';

@Module({
  imports: [UsersModule,  MembershipsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

