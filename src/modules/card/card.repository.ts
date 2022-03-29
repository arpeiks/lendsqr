import knex from '@knex/db'
import { Service } from 'typedi'
import { snakeCaseObjectMap } from '@utils/casing'
import { CreateCardRequestBody } from '@dto/request/create-card'

@Service()
export class CardRepository {
  async create(body: CreateCardRequestBody): Promise<boolean> {
    body = snakeCaseObjectMap(body)
    const data = await knex('card').insert(body)

    return data ? true : false
  }

  async findOne(number: string): Promise<{ id: number } | null> {
    const card = await knex('card').select('id').where('number', number).first()
    return card as any
  }
}
