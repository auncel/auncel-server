import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginParamDto {
  @IsNotEmpty()
  type: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
