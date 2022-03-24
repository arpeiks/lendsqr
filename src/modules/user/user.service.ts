import bcrypt from 'bcryptjs'
import { Service } from 'typedi'
import { UserRepository } from './user.repository'
import { ConflictError } from '@errors/conflict.error'
import { CreateUserRequestBody } from '@dto/request/create-user.dto'

@Service()
export class UserService {
  constructor(private readonly User: UserRepository) {}

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
    await this.beforeCreate(body)

    const salt = await bcrypt.genSalt(12)
    body.password = await bcrypt.hash(body.password, salt)

    const user = await this.User.create(body)
    console.log('service', user)
    return user
  }
}
