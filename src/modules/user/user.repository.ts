import {
  CreateUser,
  BeforeCreate,
  LoginFindUser,
  VerifyFindUser,
} from './dto/repository.dto'

import knex from '@knex/db'
import { Service } from 'typedi'
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
      .select(
        'id',
        'email',
        'phone',
        'verified',
        'last_name',
        'created_at',
        'updated_at',
        'first_name',
        'middle_name',
      )
      .where('email', body.email)
      .first()

    return camelCaseObjectMap(res)
  }

  async loginFindUser(email: string): Promise<LoginFindUser> {
    const user = await knex('user')
      .select('id', 'password', 'verified')
      .where('email', email)
      .first()

    return camelCaseObjectMap(user)
  }

  async verifyFindUser(id: number): Promise<VerifyFindUser> {
    const user = await knex('user').select('id', 'otp').where('id', id).first()
    return camelCaseObjectMap(user)
  }

  async getVerificationCodeFindUser(
    id: number,
  ): Promise<{ id: number; email: string }> {
    const user = await knex('user')
      .select('id', 'email')
      .where('id', id)
      .first()
    return camelCaseObjectMap(user)
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
