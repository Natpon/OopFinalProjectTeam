
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { Membership } from './entities/membership.entity';

const DB_PATH = path.join(process.cwd(), 'src', 'database', 'membership.json');

@Injectable()
export class MembershipRepository {
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

  async findAll(): Promise<Membership[]> {
    try {
      const raw = await fs.readFile(DB_PATH, 'utf8');
      const parsed = JSON.parse(raw || '[]') as Partial<Membership>[];
      return parsed.map((item) => new Membership(item));
    } catch (error) {
      throw new InternalServerErrorException('Failed to read membership database');
    }
  }

  async saveAll(data: Membership[]): Promise<void> {
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch {
      throw new InternalServerErrorException('Failed to write membership database');
    }
  }

  async findByUser(userId: string): Promise<Membership[]> {
    const memberships = await this.findAll();
    return memberships.filter((m) => m.userId === userId);
  }

  async findByOrganization(organizationId: string): Promise<Membership[]> {
    const memberships = await this.findAll();
    return memberships.filter((m) => m.organizationId === organizationId);
  }
}