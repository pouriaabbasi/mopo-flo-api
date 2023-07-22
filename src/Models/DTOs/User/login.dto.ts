import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  username: string;
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  password: string;
}

export class LoginResultDto {
  accessToken: string;
  refreshToken: string;
}
