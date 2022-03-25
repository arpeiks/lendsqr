import { Service } from 'typedi'
import { AccountRepository } from './account.repository'
import { CreateAccountRequestBody } from '@dto/request/create-account'
import { generateAccountNumber } from 'utils/account-number'

@Service()
export class AccountService {
  constructor(private readonly Account: AccountRepository) {}
  async create(body: CreateAccountRequestBody) {
    const id = await this.Account.nextSequence()

    body.number = generateAccountNumber(id)

    return await this.Account.create(body)
  }
}
