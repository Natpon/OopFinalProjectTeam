// src/organization/organization.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

// Enhanced path resolution
const DB_PATH = path.join(process.cwd(), 'database', 'organization.json');

@Injectable()
export class OrganizationService {

  constructor() {
    // Debug: Print the database path on service initialization
    console.log('🗂️  Database path:', DB_PATH);
    console.log('🗂️  Current working directory:', process.cwd());
    
    // Ensure database directory exists on startup
    this.ensureDatabaseExists();
  }

  /**
   * Ensures the database directory and file exist
   */
  private async ensureDatabaseExists(): Promise<void> {
    try {
      const dbDir = path.dirname(DB_PATH);
      
      // Create database directory if it doesn't exist
      await fs.mkdir(dbDir, { recursive: true });
      
      // Check if file exists, if not create it with empty array
      try {
        await fs.access(DB_PATH);
        console.log('✅ Database file exists:', DB_PATH);
      } catch {
        console.log('📝 Creating new database file:', DB_PATH);
        await fs.writeFile(DB_PATH, '[]', 'utf-8');
      }
    } catch (error) {
      console.error('❌ Failed to ensure database exists:', error);
    }
  }

  /**
   * Reads all organizations from the JSON file.
   */
  private async readData(): Promise<Organization[]> {
    try {
      console.log('📖 Reading data from:', DB_PATH);
      
      // Check if file exists first
      try {
        await fs.access(DB_PATH);
      } catch {
        console.log('📝 File does not exist, creating with empty array');
        await this.ensureDatabaseExists();
        return [];
      }

      const raw = await fs.readFile(DB_PATH, 'utf-8');
      console.log('📄 Raw file content length:', raw.length);
      
      if (!raw.trim()) {
        console.log('📄 File is empty, returning empty array');
        return [];
      }

      const parsed: Partial<Organization>[] = JSON.parse(raw);
      console.log('📊 Parsed organizations count:', parsed.length);

      // Reconstruct proper Organization instances
      return parsed.map((item) => new Organization(item));
    } catch (error) {
      console.error('❌ Error reading data:', error);
      throw new InternalServerErrorException(
        `Failed to read organization data: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Writes the full organization list to the JSON file.
   */
  private async writeData(data: Organization[]): Promise<void> {
    try {
      console.log('💾 Writing', data.length, 'organizations to:', DB_PATH);
      
      // Ensure directory exists before writing
      const dbDir = path.dirname(DB_PATH);
      await fs.mkdir(dbDir, { recursive: true });
      
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
      console.log('✅ Successfully wrote data to file');
    } catch (error) {
      console.error('❌ Error writing data:', error);
      throw new InternalServerErrorException(
        `Failed to write organization data: ${(error as Error).message}`,
      );
    }
  }

  // ─── Public CRUD Methods ─────────────────────────────────────────────────────

  async findAll(): Promise<Organization[]> {
    console.log('🔍 Finding all organizations...');
    const result = await this.readData();
    console.log('📊 Found', result.length, 'organizations');
    return result;
  }

  async findOne(id: string): Promise<Organization> {
    console.log('🔍 Finding organization with ID:', id);
    const organizations = await this.readData();
    const organization = organizations.find((org) => org.id === id);

    if (!organization) {
      throw new NotFoundException(`Organization with ID "${id}" not found.`);
    }

    return organization;
  }

  async create(dto: CreateOrganizationDto): Promise<Organization> {
    console.log('➕ Creating new organization:', dto.name);
    const organizations = await this.readData();

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

    console.log('🆔 New organization ID:', newOrganization.id);
    organizations.push(newOrganization);
    await this.writeData(organizations);

    return newOrganization;
  }

  async update(id: string, dto: UpdateOrganizationDto): Promise<Organization> {
    console.log('✏️  Updating organization:', id);
    const organizations = await this.readData();
    const index = organizations.findIndex((org) => org.id === id);

    if (index === -1) {
      throw new NotFoundException(`Organization with ID "${id}" not found.`);
    }

    organizations[index].update(dto);
    await this.writeData(organizations);

    return organizations[index];
  }

  async remove(id: string): Promise<{ message: string }> {
    console.log('🗑️  Removing organization:', id);
    const organizations = await this.readData();
    const index = organizations.findIndex((org) => org.id === id);

    if (index === -1) {
      throw new NotFoundException(`Organization with ID "${id}" not found.`);
    }

    organizations.splice(index, 1);
    await this.writeData(organizations);

    return { message: `Organization "${id}" has been successfully removed.` };
  }
}
