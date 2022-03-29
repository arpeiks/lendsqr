import bcrypt from 'bcryptjs'
import Container, { Service } from 'typedi'
import { AccountRepository } from './account.repository'
import { generateAccountNumber } from 'utils/account-number'
import { FundAccountRequestBody } from '@dto/request/fund-account'
import { CreateAccountRequestBody } from '@dto/request/create-account'
import { TransactionService } from '../transaction/transaction.service'
import { BadRequestError, UnauthorizedError } from 'routing-controllers'
import { CreateTransactionRequestBody } from '@dto/request/create-transaction'
import { CardService } from 'modules/card/card.service'
import { CreatePinRequestBody } from '@dto/request/create-pin'

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

  async fund(id: number, body: FundAccountRequestBody) {
    const Card = Container.get(CardService)
    const Transaction = Container.get(TransactionService)

    const account = await this.Account.findOneById(id)

    if (!account.pin) {
      throw new BadRequestError('You must create a pin to continue')
    }

    console.log(body)
    const card = await Card.findOneById(body.cardId)
    if (!card?.id) throw new BadRequestError('The provided card does not exist')

    const validPin = await bcrypt.compare(String(body.pin), account.pin)
    if (!validPin) throw new UnauthorizedError('Invalid credentials')

    const data: CreateTransactionRequestBody = {
      tMethod: 'CARD',
      tType: 'ADD_FUND',
      amount: body.amount,
      status: 'UNCONFIRMED',
      accountId: account.id,
      from: JSON.stringify({ card }),
    }

    await Transaction.create(data)
  }

  async createPin(id: number, body: CreatePinRequestBody) {
    if (body.pin !== body.confirmPin) throw new BadRequestError('Pin mismatch')

    const update: any = { pin: null }
    const salt = await bcrypt.genSalt(12)
    update.pin = await bcrypt.hash(body.pin, salt)

    await this.Account.update(id, update)
    return true
  }
}
