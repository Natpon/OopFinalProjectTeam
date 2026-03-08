
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationRepository } from './organization.repository';

@Injectable()
export class OrganizationService {

  constructor(private readonly repository: OrganizationRepository) {
    console.log(' OrganizationService initialized');
  }



  async findAll(): Promise<Organization[]> {
    console.log(' Finding all organizations...');
    const result = await this.repository.findAll();
    console.log(' Found', result.length, 'organizations');
    return result;
  }

  async findOne(id: string): Promise<Organization> {
    console.log(' Finding organization with ID:', id);
    const organizations = await this.repository.findAll();
    const organization = organizations.find((org) => org.id === id);

    if (!organization) {
      throw new NotFoundException(`Organization with ID "${id}" not found.`);
    }

    return organization;
  }

  async create(dto: CreateOrganizationDto): Promise<Organization> {
    console.log(' Creating new organization:', dto.name);
    const organizations = await this.repository.findAll();

    const newOrganization = new Organization({
      name: dto.name,
      domain: dto.domain,
      ownerId: dto.ownerId,
      email: dto.email,
      phone: dto.phone,
      address: dto.address,
      plan: dto.plan,
      status: dto.status,
    });

    console.log(' New organization ID:', newOrganization.id);
    organizations.push(newOrganization);

    await this.repository.saveAll(organizations);

    return newOrganization;
  }

  async update(id: string, dto: UpdateOrganizationDto): Promise<Organization> {
    console.log('  Updating organization:', id);
    const organizations = await this.repository.findAll();
    const index = organizations.findIndex((org) => org.id === id);

    if (index === -1) {
      throw new NotFoundException(`Organization with ID "${id}" not found.`);
    }

    organizations[index].update(dto);


    await this.repository.saveAll(organizations);

    return organizations[index];
  }

  async remove(id: string): Promise<{ message: string }> {
    console.log('🗑️  Removing organization:', id);
    const organizations = await this.repository.findAll();
    const index = organizations.findIndex((org) => org.id === id);

    if (index === -1) {
      throw new NotFoundException(`Organization with ID "${id}" not found.`);
    }

    organizations.splice(index, 1);

    await this.repository.saveAll(organizations);

    return { message: `Organization "${id}" has been successfully removed.` };
  }
}