import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find(u => u.id === id);
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
    return user;
  }

  remove(id: string): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(index, 1);
  }
}