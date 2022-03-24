import { knex } from 'knex'
import { Service } from 'typedi'
import knexfile from '../../knexfile'
import { BeforeCreate } from '../dto'
import { CreateUserRequestBody } from 'request/create-user'

@Service()
export class UserRepository {
  async beforeCreate(body: CreateUserRequestBody): Promise<BeforeCreate> {
    const User = () => knex(knexfile['development'])('user')

    return await User()
      .select('id', 'email', 'phone')
      .where('email', body.email)
      .orWhere('phone', body.phone)
      .first()
  }

  async create(body: CreateUserRequestBody) {
    const User = () => knex(knexfile['development'])('user')

    return await User().insert(body)
  }
}
