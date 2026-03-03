import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  private organizations: Organization[] = [];

  create(dto: CreateOrganizationDto): Organization {
    try {
      const newOrg = new Organization(dto.name, dto.domain);
      this.organizations.push(newOrg);
      return newOrg;
    } catch (error: unknown) {
      // ตรวจสอบ Type ของ error แทนการใช้ any
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An unexpected error occurred during creation');
    }
  }

  findAll(): Organization[] {
    return this.organizations;
  }

  findOne(id: string): Organization {
    const org = this.organizations.find((o) => o.id === id);
    if (!org) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return org;
  }

  update(id: string, dto: UpdateOrganizationDto): Organization {
    const org = this.findOne(id);

    try {
      if (dto.name) org.updateName(dto.name);
      if (dto.domain) org.updateDomain(dto.domain);
      return org;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Update failed due to an unknown error');
    }
  }

  remove(id: string): { success: boolean; message: string } {
    const index = this.organizations.findIndex((o) => o.id === id);
    if (index === -1) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    this.organizations.splice(index, 1);
    return { success: true, message: `Organization ${id} removed` };
  }
}