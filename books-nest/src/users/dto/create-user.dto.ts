import { IsEmail, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(40)
    username: string;

    @IsString()
    @MinLength(7)
    @MaxLength(40)
    password: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    age: number;

    ISBN: string;
}
