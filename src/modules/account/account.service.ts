import { Service } from 'typedi'
import { AccountRepository } from './account.repository'
import { generateAccountNumber } from 'utils/account-number'
import { CreateAccountRequestBody } from '@dto/request/create-account'

@Service()
export class AccountService {
  constructor(private readonly Account: AccountRepository) {}
  async create(body: CreateAccountRequestBody) {
    const id = await this.Account.nextSequence()

    body.number = generateAccountNumber(id)

    return await this.Account.create(body)
  }

  async update(id: number, update: any) {
    return await this.Account.update(id, update)
  }

  async findOneById(id: number) {
    return await this.Account.findOneById(id)
  }
}
