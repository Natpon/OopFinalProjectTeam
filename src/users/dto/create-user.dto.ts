import { IsEmail, IsString, Length } from 'class-validator';
export class CreateUserDto {

    @IsString()
    @Length(2, 50)
    fullName: string;

    @IsEmail()
    email: string;
}
