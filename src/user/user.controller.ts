import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiResponse } from '../common/interfaces/api-response.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Post()
async create(@Body() dto: CreateUserDto): Promise<ApiResponse<UserResponseDto>> {
  const data = await this.userService.create(dto);
  return {
    success: true,
    message: 'User created successfully',
    data,
  };
}

@Get()
async findAll(@Query() query: QueryUserDto): Promise<ApiResponse<UserResponseDto[]>> {
  const data = await this.userService.findAll(query);
  return {
    success: true,
    message: 'Users retrieved successfully',
    data,
  };
}

@Get(':id')
async findOne(@Param('id') id: string): Promise<ApiResponse<UserResponseDto>> {
  const data = await this.userService.findOne(id);
  return {
    success: true,
    message: 'User retrieved successfully',
    data,
  };
}

@Put(':id')
async replace(@Param('id') id: string, @Body() dto: CreateUserDto): Promise<ApiResponse<UserResponseDto>> {
  const data = await this.userService.update(id, dto);
  return {
    success: true,
    message: 'User replaced successfully',
    data,
  };
}

@Patch(':id')
async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<ApiResponse<UserResponseDto>> {
  const data = await this.userService.update(id, dto);
  return {
    success: true,
    message: 'User updated successfully',
    data,
  };
}

@Delete(':id')
async remove(@Param('id') id: string): Promise<ApiResponse<null>> {
  await this.userService.remove(id);
  return {
    success: true,
    message: 'User deleted successfully',
    data: null,
  };
}
}
