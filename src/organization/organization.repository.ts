import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Organization } from '../organization/entities/organization.entity';

const DB_PATH = path.join(process.cwd(),  'src', 'database', 'organization.json');

@Injectable()
export class OrganizationRepository {

  constructor() {
    this.ensureDatabaseExists();
  }

  private async ensureDatabaseExists(): Promise<void> {
    const dir = path.dirname(DB_PATH);
    await fs.mkdir(dir, { recursive: true });

    try {
      await fs.access(DB_PATH);
    } catch {
      await fs.writeFile(DB_PATH, '[]', 'utf8');
    }
  }

  async findAll(): Promise<Organization[]> {
    try {
      const raw = await fs.readFile(DB_PATH, 'utf8');
      const parsed = JSON.parse(raw || '[]') as Partial<Organization>[];
      return parsed.map((item) => new Organization(item));
    } catch (error) {
      throw new InternalServerErrorException('Failed to read database');
    }
  }

  async saveAll(data: Organization[]): Promise<void> {
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch {
      throw new InternalServerErrorException('Failed to write database');
    }
  }
}