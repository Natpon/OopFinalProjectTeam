import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Membership } from './entities/membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MembershipStatus } from '../common/enums/membership-status.enum';
import { MembershipJson } from '@/common/interfaces/memberInterface';
import * as fs from 'fs';
import { Organization } from '@/organizations/entities/organization.entity';
import { OrganizationRole } from '../common/enums/organization-role.enum';
@Injectable()
export class MembershipsService {
  private memberships: Membership[] = [];
  private filePath = 'src/database/memberships.json';

  constructor() {
  try {
    const data = fs.readFileSync(this.filePath, 'utf-8');

    const parsed: MembershipJson[] = JSON.parse(data);

    this.memberships = parsed.map(
      (m) =>
        new Membership({
          userId: m.userId,
          organizationId: m.organizationId,
          role: m.role as OrganizationRole,
          status: m.status as MembershipStatus,
        }),
    );
  } catch {
    this.memberships = [];
  }
}

  private save(): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(this.memberships, null, 2),
    );
  }

  findAll(): Membership[] {
    return this.memberships;
  }

  findOne(id: string): Membership {
    const membership = this.memberships.find((m) => m.id === id);

    if (!membership) {
      throw new NotFoundException(`Membership with id ${id} not found`);
    }

    return membership;
  }

  create(dto: CreateMembershipDto): Membership {

    const exists = this.memberships.find(
      (m) =>
        m.getUserId() === dto.userId &&
        m.getOrganizationId() === dto.organizationId
    );

    if (exists) {
      throw new BadRequestException(
        'User is already a member of this organization'
      );
    }

    const membership = new Membership({
      userId: dto.userId,
      organizationId: dto.organizationId,
      role: dto.role,
      status: dto.status,
    });

    this.memberships.push(membership);

    this.save();

    return membership;
  }

  update(id: string, dto: UpdateMembershipDto): Membership {
    const membership = this.findOne(id);

    if (dto.role) {
      membership.changeRole(dto.role);
    }

    if (dto.status === MembershipStatus.ACTIVE) {
      membership.activate();
    }

    if (dto.status === MembershipStatus.SUSPENDED) {
      membership.suspend();
    }

    if (dto.status === MembershipStatus.LEFT) {
      membership.leave();
    }

    this.save();

    return membership;
  }

  remove(id: string): void {
    const index = this.memberships.findIndex((m) => m.id === id);

    if (index === -1) {
      throw new NotFoundException(`Membership with id ${id} not found`);
    }

    this.memberships.splice(index, 1);

    this.save();
  }

  findByUser(userId: string): Membership[] {
    return this.memberships.filter(
      (m) => m.getUserId() === userId
    );
  }

  findByOrganization(organizationId: string): Membership[] {
    return this.memberships.filter(
      (m) => m.getOrganizationId() === organizationId
    );
  }
}