import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'

export class CreateBookDto {
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    name: string;

    author: string;
    @IsNumber()
    @Min(1)
    @Max(100)
    value: number;

    ISBN: string;
}
