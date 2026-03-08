// src/membership/membership.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { MembershipRepository } from './membership.repository';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { Membership } from './entities/membership.entity';

@Injectable()
export class MembershipService {
  constructor(private readonly repository: MembershipRepository) {}

  async create(dto: CreateMembershipDto): Promise<Membership> {
    const memberships = await this.repository.findAll();
    
    // Rule: Prevent duplicate membership
    const alreadyExists = memberships.find(
      (m) => m.userId === dto.userId && m.organizationId === dto.organizationId
    );
    if (alreadyExists) {
      throw new ConflictException('User is already a member of this organization.');
    }

    const newMembership = new Membership(dto);
    memberships.push(newMembership);
    await this.repository.saveAll(memberships);

    return newMembership;
  }

  async listOrganizationMembers(organizationId: string): Promise<Membership[]> {
    return this.repository.findByOrganization(organizationId);
  }

  async update(id: string, dto: UpdateMembershipDto): Promise<Membership> {
    const memberships = await this.repository.findAll();
    const index = memberships.findIndex((m) => m.id === id);

    if (index === -1) {
      throw new NotFoundException(`Membership with ID "${id}" not found.`);
    }

    memberships[index].update(dto);
    await this.repository.saveAll(memberships);

    return memberships[index];
  }

  async remove(id: string): Promise<{ message: string }> {
    const memberships = await this.repository.findAll();
    const index = memberships.findIndex((m) => m.id === id);

    if (index === -1) {
      throw new NotFoundException(`Membership with ID "${id}" not found.`);
    }

    memberships.splice(index, 1);
    await this.repository.saveAll(memberships);

    return { message: `Membership "${id}" successfully removed.` };
  }
  // 🌟 เพิ่มฟังก์ชันนี้เข้าไปใน MembershipService
  async findByUser(userId: string): Promise<Membership[]> { // <-- อาจจะต้องใส่ Type : Promise<Membership[]> ด้วย
    return this.repository.findByUser(userId); 
    // หมายเหตุ: ชื่อตัวแปร membershipRepository อาจจะต่างกัน ขึ้นอยู่กับว่าใน constructor ของ Service คุณตั้งชื่อว่าอะไร
  }
}