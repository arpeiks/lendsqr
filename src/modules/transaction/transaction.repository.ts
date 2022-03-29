import knex from '@knex/db'
import { Service } from 'typedi'
import { snakeCaseObjectMap } from '@utils/casing'
import { CreateTransactionRequestBody } from '@dto/request/create-transaction'

@Service()
export class TransactionRepository {
  async create(body: CreateTransactionRequestBody) {
    body = snakeCaseObjectMap(body)

    await knex('transaction').insert(body)
    return true
  }
}
