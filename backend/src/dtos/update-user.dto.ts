import {
  IsAlpha,
  IsAlphanumeric,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserRequest {
  @IsNotEmpty()
  @IsString()
  id: string;

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
