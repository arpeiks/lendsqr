import { IsEmail, IsNumber, IsPhoneNumber } from 'class-validator'

export class BeforeCreate {
  @IsNumber()
  id!: number

  @IsEmail()
  email!: string

  @IsPhoneNumber()
  phone!: string
}
