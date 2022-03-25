import { Service } from 'typedi'
import { UserService } from './user.service'
import { CreateUserRequestBody } from '@dto/request/create-user.dto'
import { Body, JsonController as Controller, Post } from 'routing-controllers'

@Service()
@Controller('/user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post()
  async create(@Body() body: CreateUserRequestBody) {
    return await this.user.create(body)
  }
}
