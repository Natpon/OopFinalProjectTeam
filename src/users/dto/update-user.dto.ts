/*import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

===THE CODE BELOW THIS COMMENT WAS MADE BY PON====
*/

import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(2, 50)
    fullName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}