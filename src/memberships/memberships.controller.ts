import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { Membership } from './entities/membership.entity';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get()
  findAll(): Membership[] {
    return this.membershipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Membership {
    return this.membershipsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMembershipDto): Membership {
    return this.membershipsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMembershipDto,
  ): Membership {
    return this.membershipsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.membershipsService.remove(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Membership[] {
    return this.membershipsService.findByUser(userId);
  }

  @Get('org/:orgId')
  findByOrganization(@Param('orgId') orgId: string): Membership[] {
    return this.membershipsService.findByOrganization(orgId);
  }
}