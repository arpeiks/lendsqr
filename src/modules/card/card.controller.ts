import {
  Body,
  Post,
  Session,
  InternalServerError,
  JsonController as Controller,
  UnauthorizedError,
} from 'routing-controllers'

import { Service } from 'typedi'
import { logger } from '@utils/logger'
import { CardService } from './card.service'
import { CreateCardRequestBody } from '@dto/request/create-card'

@Service()
@Controller('/card')
export class CardController {
  constructor(private readonly Card: CardService) {}

  @Post()
  async addCard(@Body() body: CreateCardRequestBody, @Session() session: any) {
    try {
      if (!session.authenticated) throw new UnauthorizedError('Unauthorized')

      const accountId = session.user.accountId
      await this.Card.create(accountId, body)

      return session.user
    } catch (err: any) {
      logger.error(`Internal Server Error - ${err}`)
      throw new InternalServerError('Something went wrong')
    }
  }
}
