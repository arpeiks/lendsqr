import dayjs from 'dayjs'
import bcrypt from 'bcryptjs'
import { Service } from 'typedi'
import { sendMail } from '@utils/send-mail'
import { UserRepository } from './user.repository'
import { LoginRequestBody } from '@dto/request/login'
import { ConflictError } from '@errors/conflict.error'
import { AccountService } from '@account/account.service'
import { welcomeMailTemplate } from '@utils/resolve-mail-template'
import { CreateUserRequestBody } from '@dto/request/create-user.dto'
import { BadRequestError, NotFoundError } from 'routing-controllers'

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
    body.otp = String(dayjs().add(1, 'hour').valueOf())

    const salt = await bcrypt.genSalt(12)
    body.password = await bcrypt.hash(body.password, salt)

    const user = await this.User.create(body)
    await this.Account.update(account.id, { userId: user.id })

    url = `${url}?id=${user.id}&token=${body.otp}`
    const html = await welcomeMailTemplate(url, 'welcome')

    await sendMail(user.email, html)

    return user
  }

  async login(body: LoginRequestBody) {
    const user = await this.User.loginFindUser(body.email)

    if (!user.id) throw new NotFoundError('not found')

    const passValid = await bcrypt.compare(body.password, user.password)
    if (!passValid) throw new BadRequestError('Invalid credentials')

    return user
  }

  async verify(id: number, token: number) {
    console.log(id, token)
    const user = await this.User.verifyFindUser(id)
    if (token !== Number(user.otp)) return 'Invalid'

    const now = dayjs().valueOf()
    const exp = dayjs(token).valueOf()

    if (now > exp) return 'Expired'

    const update = { verified: true }
    await this.User.update(id, update)
    return 'success'
  }

  async getVerificationCode(url: string, id: number) {
    const user = await this.User.getVerificationCodeFindUser(id)
    const otp = String(dayjs().add(1, 'hour').valueOf())

    const update = { otp }
    url = `${url}?id=${user.id}&token=${otp}`

    await this.User.update(id, update)

    const html = await welcomeMailTemplate(url, 'welcome')
    await sendMail(user.email, html)

    return true
  }
}
