import knex from '@knex/db'
import { Service } from 'typedi'
import { Create } from './dto/repository'
import { camelCaseObjectMap, snakeCaseObjectMap } from '@utils/casing'
import { CreateAccountRequestBody } from '@dto/request/create-account'

@Service()
export class AccountRepository {
  async create(body: CreateAccountRequestBody): Promise<Create> {
    body = snakeCaseObjectMap(body)

    await knex('account').insert(body)
    const res = await knex('account')
      .select('id')
      .where('number', body.number)
      .first()

    return camelCaseObjectMap(res)
  }

  async nextSequence(): Promise<number | undefined> {
    const data = await knex('account').max('id', { as: 'id' }).first()
    return Number(data?.id || 0) + 1
  }

  async update(id: number, update: any) {
    update = snakeCaseObjectMap(update)
    return await knex('account').update(update).where('id', id)
  }

  async findOneById(id: number) {
    return await knex('account').select('*').where('id', id).first()
  }
}
