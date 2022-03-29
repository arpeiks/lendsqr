import {
  Body,
  Post,
  InternalServerError,
  JsonController as Controller,
} from 'routing-controllers'

import { Service } from 'typedi'
import { logger } from '@utils/logger'
import { CardService } from './card.service'
import { AddCardRequestBody } from '@dto/request/add-card'

@Service()
@Controller('/card')
export class CardController {
  constructor(private readonly Card: CardService) {}

  @Post()
  async addCard(@Body() body: AddCardRequestBody) {
    const user = { id: 1 }
    try {
      console.log(body)
      console.log(this.Card)
      return user
    } catch (err: any) {
      console.log(err)
      console.log({ err })
      logger.error(`Internal Server Error - ${err.sqlMessage}`)
      throw new InternalServerError('Something went wrong')
    }
  }
}
