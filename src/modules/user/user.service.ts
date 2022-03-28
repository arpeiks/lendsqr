import dayjs from 'dayjs'
import bcrypt from 'bcryptjs'
import { Service } from 'typedi'
import { sendMail } from '@utils/send-mail'
import { UserRepository } from './user.repository'
import { ConflictError } from '@errors/conflict.error'
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

  async create(url: string, body: CreateUserRequestBody) {
    await this.beforeCreate(body)

    const account = await this.Account.create({})

    body.account_id = account.id
    body.otp = String(dayjs().valueOf())

    const salt = await bcrypt.genSalt(12)
    body.password = await bcrypt.hash(body.password, salt)

    const user = await this.User.create(body)

    url = `${url}/verify?id=${user.id}&token=${body.otp}`
    const html = await welcomeMailTemplate(url, 'welcome')

    await sendMail(user.email, html)

    return user
  }

  async verify(id: number, token: number) {
    const user = await this.User.findById(id)
    if (token !== Number(user.otp)) return false

    const now = dayjs().valueOf()
    const exp = dayjs(token).valueOf()

    if (now > exp) return false

    const update = { verified: true }
    await this.User.update(id, update)
    return true
  }
}
