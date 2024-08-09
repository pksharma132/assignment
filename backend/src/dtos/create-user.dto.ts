import {
  IsAlpha,
  IsAlphanumeric,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsOptional()
  @IsAlpha()
  surname: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: string;
}
