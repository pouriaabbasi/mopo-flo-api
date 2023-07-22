import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  username: string;
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  password: string;
}
