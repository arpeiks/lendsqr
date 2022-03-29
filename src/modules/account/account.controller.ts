import { Service } from 'typedi'
import { AccountService } from './account.service'
import { FundAccountRequestBody } from '@dto/request/fund-account'
import {
  Body,
  JsonController as Controller,
  Post,
  Session,
  UnauthorizedError,
} from 'routing-controllers'
import { CreatePinRequestBody } from '@dto/request/create-pin'

@Service()
@Controller('/account')
export class AccountController {
  constructor(private readonly Account: AccountService) {}

  @Post('/fund')
  async fund(@Body() body: FundAccountRequestBody, @Session() session: any) {
    try {
      const userId = session?.user?.id
      if (!userId) throw new UnauthorizedError('Unauthorized')

      const accountId = session.user.accountId
      return await this.Account.fund(accountId, body)
    } catch (err) {
      console.log({ err })
    }
  }

  @Post('/pin')
  async createPin(@Body() body: CreatePinRequestBody, @Session() session: any) {
    const userId = session?.user?.id
    if (!userId) throw new UnauthorizedError('Unauthorized')

    const accountId = session.user.accountId
    return await this.Account.createPin(accountId, body)
  }
}
