import { Service } from 'typedi'
import { CardRepository } from './card.repository'
import { CreateCardRequestBody } from '@dto/request/create-card'
import { BadRequestError } from 'routing-controllers'

@Service()
export class CardService {
  constructor(private readonly Card: CardRepository) {}

  async create(id: number, body: CreateCardRequestBody) {
    const card = await this.Card.findOne(body.number)
    if (card?.id) throw new BadRequestError('Card already exist')

    body.accountId = id
    return await this.Card.create(body)
  }
}
