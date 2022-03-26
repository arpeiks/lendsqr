import bcrypt from 'bcryptjs'
import { Service } from 'typedi'
import { UserRepository } from './user.repository'
import { randomNumber } from '@utils/random-number'
import { ConflictError } from '@errors/conflict.error'
import { sendVerifyAccountMail } from '@utils/send-mail'
import { AccountService } from '@account/account.service'
import { welcomeMailTemplate } from '@utils/resolve-mail-template'
import { CreateUserRequestBody } from '@dto/request/create-user.dto'

@Service()
export class UserService {
  constructor(
    private readonly User: UserRepository,
    private readonly Account: AccountService,
  ) {}

  async beforeCreate(body: CreateUserRequestBody) {
    const errors: string[] = []

    const user = await this.User.beforeCreate(body)

    if (user?.email === body.email) {
      errors.push('The email address is unavailable')
    }
    if (user?.phone === body.phone) {
      errors.push('The phone number is unavailable')
    }

    if (errors.length) throw new ConflictError(errors)
  }

  async create(body: CreateUserRequestBody) {
    try {
      await this.beforeCreate(body)

      const account = await this.Account.create({})

      body.account_id = account.id
      body.otp = randomNumber(6)

      const salt = await bcrypt.genSalt(12)
      body.password = await bcrypt.hash(body.password, salt)

      const user = await this.User.create(body)

      const html = await welcomeMailTemplate('https://google.com', 'welcome')
      await sendVerifyAccountMail(user.email, html)

      return user
    } catch (err) {
      console.log(err)
      console.log({ err })
    }
  }
}
