import knex from '@knex/db'
import { Service } from 'typedi'
import { BeforeCreate, CreateUser } from './dto/repository.dto'
import { CreateUserRequestBody } from '@dto/request/create-user.dto'
import { camelCaseObjectMap, snakeCaseObjectMap } from '@utils/casing'

@Service()
export class UserRepository {
  async beforeCreate(body: CreateUserRequestBody): Promise<BeforeCreate> {
    body = snakeCaseObjectMap(body)

    const res = await knex('user')
      .select('id', 'email', 'phone')
      .where('email', body.email)
      .orWhere('phone', body.phone)
      .first()

    return camelCaseObjectMap(res)
  }

  async create(body: CreateUserRequestBody): Promise<CreateUser> {
    body = snakeCaseObjectMap(body)

    await knex('user').insert(body)
    const res = await knex('user')
      .select('*')
      .where('email', body.email)
      .first()

    return camelCaseObjectMap(res)
  }

  async findById(id: number) {
    return await knex('user').where('id', id).first()
  }

  async update(id: number, update: any) {
    return await knex('user').update(update).where('id', id)
  }

  async addCard(id: number) {
    return await knex('user').select('*').where('id', id).first()
  }
}
