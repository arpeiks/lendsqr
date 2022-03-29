import { Service } from 'typedi'
import { snakeCaseObjectMap } from '@utils/casing'
import { TransactionRepository } from './transaction.repository'
import { CreateTransactionRequestBody } from '@dto/request/create-transaction'

@Service()
export class TransactionService {
  constructor(private readonly Transaction: TransactionRepository) {}

  async create(body: CreateTransactionRequestBody) {
    body = snakeCaseObjectMap(body)
    return await this.Transaction.create(body)
  }
}
