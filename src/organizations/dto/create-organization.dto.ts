import { IsString, Length, Matches } from 'class-validator';

export class CreateOrganizationDto {

  @IsString()
  @Length(2, 100)
  name!: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  domain!: string;

}