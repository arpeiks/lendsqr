import { Service } from 'typedi'
import User from '../repositories/user.repository'
import { CreateUserRequestBody } from 'request/create-user'

@Service()
export class UserService {
  async create(body: CreateUserRequestBody) {
    await User().insert(body)
    const res = await User().select('*').where('email', body.email)
    return res
  }
}
