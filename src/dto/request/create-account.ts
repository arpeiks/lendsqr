import {
  Length,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsCurrency,
  IsNumberString,
} from 'class-validator'

export class CreateAccountRequestBody {
  @IsString()
  @IsOptional()
  pin?: string

  @IsNumber()
  @IsOptional()
  user_id?: number

  @IsNotEmpty()
  @IsCurrency()
  balance?: number

  @IsNotEmpty()
  @IsNumberString()
  @Length(10, 10)
  number?: string
}
