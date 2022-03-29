import {
  Length,
  Matches,
  IsString,
  IsNotEmpty,
  IsCreditCard,
} from 'class-validator'

const expRegEx = /^(0[1-9]\/|1[0-2])\/?([0-9]{2}|[0-9]{2})$/gm

export class AddCardRequestBody {
  @IsString()
  @IsCreditCard()
  number!: string

  @Matches(expRegEx, { message: 'Invalid Expiry Date' })
  exp!: number

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  cvv!: number
}
