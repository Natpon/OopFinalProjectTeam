

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { OrganizationStatus } from '../enums/organization-status.enum';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  domain!: string;

  @IsUUID()
  ownerId!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  address!: string;

  @IsString()
  plan!: string;

  @IsEnum(OrganizationStatus)
  status!: OrganizationStatus;
}
