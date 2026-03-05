/*import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import * as fs from 'fs'

@Injectable()
export class OrganizationsService {
  private organization: Organization[] = [];

   constructor() {
      const data = fs.readFileSync('src/database/organization.json', 'utf-8');
      this.organization = JSON.parse(data);
    }

  create(dto: CreateOrganizationDto): Organization {
    try {
      const newOrg = new Organization(dto.name, dto.domain);
      this.organization.push(newOrg);
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
    return this.organization;
  }

  findOne(id: string): Organization {
    const org = this.organization.find((o) => o.id === id);
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
    const index = this.organization.findIndex((o) => o.id === id);
    if (index === -1) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    this.organization.splice(index, 1);
    return { success: true, message: `Organization ${id} removed` };
  }
}*/

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import * as fs from 'fs';

@Injectable()
export class OrganizationsService {
  private organizations: Organization[] = [];
  private readonly filePath = 'src/database/organization.json';

  constructor() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    const raw = JSON.parse(data);

    // แปลง JSON → Organization instance
    this.organizations = raw.map(
      (o: any) => new Organization(o.name, o.domain)
    );
  }

  private save(): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(this.organizations, null, 2)
    );
  }

  create(dto: CreateOrganizationDto): Organization {
    try {
      // เช็ค domain ซ้ำ
      const exists = this.organizations.find(
        (o) => o.getDomain() === dto.domain
      );

      if (exists) {
        throw new BadRequestException('Domain already exists');
      }

      const newOrg = new Organization(dto.name, dto.domain);

      this.organizations.push(newOrg);
      this.save();

      return newOrg;
    } catch (error: unknown) {
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
    const org = this.organizations.find((o) => o.getId() === id);

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

      this.save();

      return org;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Update failed due to an unknown error');
    }
  }

  remove(id: string): { success: boolean; message: string } {
    const index = this.organizations.findIndex((o) => o.getId() === id);

    if (index === -1) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    this.organizations.splice(index, 1);

    this.save();

    return {
      success: true,
      message: `Organization ${id} removed`,
    };
  }
}