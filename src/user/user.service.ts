import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcrypt';
import { promises as fs } from 'fs';
import { join } from 'path'; 
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { UserStatus } from './enums/user-status.enum';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  
async create(dto: CreateUserDto): Promise<UserResponseDto> {

  const users = await this.userRepository.findAll();

  if (users.some((u: User): boolean => u.email === dto.email)) {
    throw new ConflictException('Email already exists');
  }

  if (users.some((u: User): boolean => u.username === dto.username)) {
    throw new ConflictException('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const user: User = {
  id: randomUUID(),
  ...dto,
  role: UserRole.USER,
  status: UserStatus.ACTIVE,
  lastLoginAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

  await this.userRepository.save(user);

  return this.toResponse(user);
}

  async findAll(query: QueryUserDto): Promise<UserResponseDto[]> {

  const { search } = query;

  let users = await this.userRepository.findAll();

  if (search) {
    const s = search.toLowerCase();
    users = users.filter((u: User) =>
      u.username.toLowerCase().includes(s) ||
      u.displayName.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s)
    );
  }

  return users.map((u: User) => this.toResponse(u));
}

  async findOne(id: string): Promise<UserResponseDto> {

  const users = await this.userRepository.findAll();

  const user = users.find((u: User) => u.id === id);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return this.toResponse(user);
}

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {

    const users = await this.userRepository.findAll();
    const index = users.findIndex((u: User): boolean => u.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const current = users[index];

    if (dto.email && dto.email !== current.email) {
      if (users.some((u: User): boolean => u.email === dto.email)) {
        throw new ConflictException('Email already exists');
      }
    }

    if (dto.username && dto.username !== current.username) {
      if (users.some((u: User): boolean => u.username === dto.username)) {
        throw new ConflictException('Username already exists');
      }
    }

    const updated: User = {
      ...current,
      ...dto,
      updatedAt: new Date(),
    };

    users[index] = updated;

    await this.userRepository.writeAll(users);

    return this.toResponse(updated);
  }

  async remove(id: string): Promise<void> {

    const users = await this.userRepository.findAll();

    const filtered = users.filter((u: User): boolean => u.id !== id);

    if (filtered.length === users.length) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.writeAll(filtered);
  }

  private toResponse(user: User): UserResponseDto {
    const { password, ...rest } = user;
    return rest;
  }
}