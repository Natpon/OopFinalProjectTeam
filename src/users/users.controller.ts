import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '@/common/interfaces/api-response.interface';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): ApiResponse<User[]> {
    return {
      success: true,
      message: 'Users retrieved successfully',
      data: this.usersService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<User> {
    return {
      success: true,
      message: 'User retrieved successfully',
      data: this.usersService.findOne(id),
    };
  }

  @Post()
  create(@Body() dto: CreateUserDto): ApiResponse<User> {
    return {
      success: true,
      message: 'User created successfully',
      data: this.usersService.create(dto),
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto): ApiResponse<User> {
    return {
      success: true,
      message: 'User updated successfully',
      data: this.usersService.update(id, dto),
    };
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() dto: UpdateUserDto): ApiResponse<User> {
    return {
      success: true,
      message: 'User partially updated successfully',
      data: this.usersService.update(id, dto),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    this.usersService.remove(id);
    return {
      success: true,
      message: 'User deleted successfully',
      data: null,
    };
  }
}