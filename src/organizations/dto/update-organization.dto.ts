import { IsOptional, IsString, Length, Matches, IsUrl } from 'class-validator';

export class UpdateOrganizationDto {

  @IsOptional()
  @IsString()
  @Length(2, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  domain?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsOptional()
  @IsUrl({ require_protocol: false })
  @Length(0, 500)
  logoUrl?: string;

  @IsOptional()
  @IsUrl({ require_protocol: false })
  @Length(0, 200)
  website?: string;
}