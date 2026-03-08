import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Post()
create(@Body() dto: CreateUserDto) {
  return this.userService.create(dto);
}

@Get()
async findAll(@Query() query: QueryUserDto): Promise<UserResponseDto[]> {
  return this.userService.findAll(query);
}

@Get(':id')
async findOne(@Param('id') id: string): Promise<UserResponseDto> {
  return this.userService.findOne(id);
}

@Patch(':id')
async update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
  return this.userService.update(id, dto);
}

@Delete(':id')
async remove(@Param('id') id: string): Promise<void> {
  return this.userService.remove(id)

  
}
}
