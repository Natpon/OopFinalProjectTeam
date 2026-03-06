import { IsOptional, IsString, IsUrl, Length, Matches } from 'class-validator';

export class CreateOrganizationDto {

  @IsString()
  @Length(2, 100)
  name!: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  domain!: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsOptional()
  @IsUrl()
  @Length(0, 500)
  logoUrl?: string;

  @IsOptional()
  @IsUrl()
  @Length(0, 200)
  website?: string;
}  