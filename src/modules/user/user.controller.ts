import { Service } from 'typedi'
import { UserService } from './user.service'
import { CreateUserRequestBody } from '@dto/request/create-user.dto'
import {
  Body,
  Get,
  InternalServerError,
  JsonController as Controller,
  Post,
  QueryParam,
  Redirect,
  Req,
  Res,
} from 'routing-controllers'
import { logger } from '@utils/logger'
import { Request, Response } from 'express'
import { apiUrl } from '@utils/api-url'

@Service()
@Controller('/user')
export class UserController {
  constructor(private readonly User: UserService) {}

  @Post()
  async create(@Body() body: CreateUserRequestBody, @Req() req: Request) {
    try {
      return await this.User.create(apiUrl(req), body)
    } catch (err: any) {
      logger.error(`Internal Server Error - ${err.sqlMessage}`)
      throw new InternalServerError('Something went wrong')
    }
  }

  @Get('/verify')
  @Redirect('/')
  async verify(
    @Res() _res: Response,
    @QueryParam('id') id: number,
    @QueryParam('token') token: number,
  ) {
    try {
      const res = await this.User.verify(id, token)
      return res ? '/api/user/verify/success' : '/api/user/verify/failed'
    } catch (err) {
      throw new InternalServerError('Something went wrong')
    }
  }

  @Get('/verify/success')
  async verifySuccess(@Res() res: Response) {
    return res.send('<h1>success</h1>')
  }
}
