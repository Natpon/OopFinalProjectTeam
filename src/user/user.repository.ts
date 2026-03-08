import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { User } from './entities/user.entity';
@Injectable()
export class UserRepository {

  private filePath = join(process.cwd(), './src/database/users.json');

  async findAll(): Promise<User[]> {
    const data = await fs.readFile(this.filePath, 'utf8');
    return JSON.parse(data) as User[];
  }

  async writeAll(users: User[]): Promise<void> {
    await fs.writeFile(
      this.filePath,
      JSON.stringify(users, null, 2),
      'utf8'
    );
  }

  async save(user: User): Promise<void> {

  console.log("saving user", user);

  const users = await this.findAll();
  users.push(user);

  await this.writeAll(users);

  console.log("user saved");
}
}