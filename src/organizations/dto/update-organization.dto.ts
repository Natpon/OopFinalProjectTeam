import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateOrganizationDto {

  @IsOptional()
  @IsString()
  @Length(2, 100)
  name!: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  domain!: string;

}