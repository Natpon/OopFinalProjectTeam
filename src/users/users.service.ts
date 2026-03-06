import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private readonly filePath = 'src/database/users.json';

  constructor() {
    this.load();
  }

  private load(): void {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      const parsed = JSON.parse(data);

      this.users = (Array.isArray(parsed) ? parsed : []).map(
        (u) =>
          new User({
            email: u.email,
            fullName: u.fullName,
            status: u.status,
          }),
      );
    } catch {
      this.users = [];
    }
  }

  private save(): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(this.users, null, 2),
      'utf-8',
    );
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  create(dto: CreateUserDto): User {
    const user = new User({
      email: dto.email,
      fullName: dto.fullName,
      status: dto.status,
    });

    this.users.push(user);
    this.save();

    return user;
  }

  update(id: string, dto: UpdateUserDto): User {
    const user = this.findOne(id);

    if (dto.fullName || dto.email) {
      user.updateProfile(
        dto.fullName ?? user.getFullName(),
        dto.email ?? user.getEmail(),
      );
    }

    if (dto.status) {
      dto.status === 'ACTIVE' ? user.activate() : user.suspend();
    }

    this.save();
    return user;
  }

  remove(id: string): void {
    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(index, 1);
    this.save();
  }
}