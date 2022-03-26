import knex from '@knex/db'
import { Service } from 'typedi'
import { CreateAccountRequestBody } from '@dto/request/create-account'

@Service()
export class AccountRepository {
  async create(body: CreateAccountRequestBody) {
    await knex('account').insert(body)
    return await knex('account').where('number', body.number).first()
  }

  async nextSequence(): Promise<number | undefined> {
    const data = await knex('account').max('id', { as: 'id' }).first()
    return Number(data?.id || 1) + 1
  }
}
