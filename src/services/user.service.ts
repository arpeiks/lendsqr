import { Service } from 'typedi'
import { ConflictError } from '../errors'
import { CreateUserRequestBody } from 'request/create-user'
import { UserRepository } from '../repositories/user.repository'

@Service()
export class UserService {
  constructor(private readonly User: UserRepository) {}

  async beforeCreate(body: CreateUserRequestBody) {
    const errors: string[] = []
    const user = await this.User.beforeCreate(body)

    console.log(user)

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

    const user = await this.User.create(body)
    console.log(user)

    return user
  }
}
