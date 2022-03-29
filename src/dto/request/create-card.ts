import { Length, IsString, IsNotEmpty, IsCreditCard } from 'class-validator'

// const expRegEx = /^(0[1-9]\/|1[0-2])\/?([0-9]{2}|[0-9]{2})$/gm

export class CreateCardRequestBody {
  @IsString()
  @IsCreditCard()
  number!: string

  @IsString()
  @IsNotEmpty()
  exp!: number

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  cvv!: number

  accountId!: number
}
