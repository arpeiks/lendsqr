import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator'

export class LoginRequestBody {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string
}
