import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import * as fs from 'fs';

@Injectable()
export class OrganizationsService {
  private organizations: Organization[] = [];

  constructor() {
  const data = fs.readFileSync('src/database/organization.json', 'utf-8');
  const parsed = JSON.parse(data);

  this.organizations = parsed.map(
    (o: any) =>
      new Organization(
        o.name,
        o.domain,
        o.description,
        o.logoUrl,
        o.website,
      ),
  );
}
  private save(): void {
    fs.writeFileSync(
      'src/database/organization.json',
      JSON.stringify(this.organizations, null, 2),
    );
  }

  findAll(): Organization[] {
    return this.organizations;
  }

  findOne(id: string): Organization {
    const org = this.organizations.find(o => o.id === id);

    if (!org) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }

    return org;
  }

  create(dto: CreateOrganizationDto): Organization {

  const domain = dto.domain.toLowerCase().trim();

  const existing = this.organizations.find(
    o => o.domain.toLowerCase() === domain,
  );

  if (existing) {
    throw new BadRequestException(
      `Organization with domain "${domain}" already exists`,
    );
  }

  const organization = new Organization(
    dto.name,
    domain,
    dto.description,
    dto.logoUrl,
    dto.website,
  );

  this.organizations.push(organization);
  this.save();

  return organization;
}
  update(id: string, dto: UpdateOrganizationDto): Organization {
  const org = this.findOne(id);

  if (dto.name !== undefined) {
    org.updateName(dto.name);
  }

  if (dto.domain !== undefined) {
    const domain = dto.domain.trim().toLowerCase();

    const exists = this.organizations.find(
      o => o.domain === domain && o.id !== id,
    );

    if (exists) {
      throw new BadRequestException(
        `Organization with domain "${domain}" already exists`,
      );
    }

    org.updateDomain(domain);
  }

  if (dto.description !== undefined) {
    org.updateDescription(dto.description);
  }

  if (dto.logoUrl !== undefined) {
    org.updateLogo(dto.logoUrl);
  }

  if (dto.website !== undefined) {
    org.updateWebsite(dto.website);
  }

  this.save();   

  return org;
}
  remove(id: string): void {
    const index = this.organizations.findIndex(o => o.id === id);

    if (index === -1) {
      throw new NotFoundException(`Organization with id ${id} not found`);
    }

    this.organizations.splice(index, 1);
    this.save();
  }
}