import knex from '@knex/db'
import { Service } from 'typedi'
import { BeforeCreate } from './user.dto'
import { CreateUserRequestBody } from '@dto/request/create-user.dto'
import { Knex } from 'knex'

@Service()
export class UserRepository {
  constructor(private readonly User: Knex.QueryBuilder) {
    this.User = knex('user')
  }

  async beforeCreate(body: CreateUserRequestBody): Promise<BeforeCreate> {
    return await this.User.select('id', 'email', 'phone')
      .where('email', body.email)
      .orWhere('phone', body.phone)
      .first()
  }

  async create(body: CreateUserRequestBody) {
    return await this.User.insert(body)
  }
}
