import { IsOptional, IsNumberString, IsString } from 'class-validator';
import e from 'express';
import { PaginationQueryDto } from './pagination-query.dto';

export class QueryUserDto extends PaginationQueryDto {

  @IsOptional()
  @IsString()
  search?: string;

}