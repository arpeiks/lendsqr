import {
  IsAlpha,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator'

export class CreateUserRequestBody {
  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName!: string

  @IsAlpha()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName!: string

  @IsAlpha()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  middleName?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone!: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string
}
