import knex from '@knex/db'
import { Service } from 'typedi'
import { camelCaseObjectMap, snakeCaseObjectMap } from '@utils/casing'
import { CreateAccountRequestBody } from '@dto/request/create-account'

@Service()
export class AccountRepository {
  async create(body: CreateAccountRequestBody) {
    body = snakeCaseObjectMap(body)

    await knex('account').insert(body)
    const res = await knex('account').where('number', body.number).first()

    return camelCaseObjectMap(res)
  }

  async nextSequence(): Promise<number | undefined> {
    const data = await knex('account').max('id', { as: 'id' }).first()
    return Number(data?.id || 1) + 1
  }
}
