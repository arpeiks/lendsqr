import knex from '@knex/db'
import { Service } from 'typedi'
import { BeforeCreate, CreateUser } from './dto/repository.dto'
import { CreateUserRequestBody } from '@dto/request/create-user.dto'

@Service()
export class UserRepository {
  async beforeCreate(body: CreateUserRequestBody): Promise<BeforeCreate> {
    return await knex('user')
      .select('id', 'email', 'phone')
      .where('email', body.email)
      .orWhere('phone', body.phone)
      .first()
  }

  async create(body: CreateUserRequestBody): Promise<CreateUser> {
    await knex('user').insert(body)
    return await knex('user').select('*').where('email', body.email).first()
  }
}
