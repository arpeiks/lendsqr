import {
  Get,
  Req,
  Res,
  Body,
  Post,
  Redirect,
  QueryParam,
  InternalServerError,
  JsonController as Controller,
  Param,
} from 'routing-controllers'

import { Service } from 'typedi'
import { logger } from '@utils/logger'
import { apiUrl } from '@utils/api-url'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { LoginRequestBody } from '@dto/request/login'
import { CreateUserRequestBody } from '@dto/request/create-user.dto'

@Service()
@Controller('/user')
export class UserController {
  constructor(private readonly User: UserService) {}

  @Post()
  async create(@Body() body: CreateUserRequestBody, @Req() req: Request) {
    try {
      return await this.User.create(apiUrl(req), body)
    } catch (err: any) {
      logger.error(`Internal Server Error - ${err}`)
      throw new InternalServerError('Something went wrong')
    }
  }

  @Post('/login')
  async login(@Body() body: LoginRequestBody) {
    try {
      return await this.User.login(body)
    } catch (err: any) {
      logger.error({ ...err })
      throw new InternalServerError(err)
    }
  }

  @Get('/verify/code')
  async getVerificationCode(@Req() req: Request) {
    try {
      const userId = 1
      await this.User.getVerificationCode(apiUrl(req), userId)
      return true
    } catch (err) {
      throw new InternalServerError('Something went wrong')
    }
  }

  @Get('/verify')
  @Redirect('/api/user/verify/:status')
  async verify(
    @QueryParam('id') id: number,
    @QueryParam('token') token: number,
  ) {
    try {
      const res = await this.User.verify(id, token)
      return { status: res }
    } catch (err) {
      throw new InternalServerError('Something went wrong')
    }
  }

  @Get('/verify/:status')
  async verifySuccess(@Res() res: Response, @Param('status') status: string) {
    console.log(status)
    return res.send(`<h1>${status}</h1>`)
  }
}
