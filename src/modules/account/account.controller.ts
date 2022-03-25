import { Service } from 'typedi'
import { JsonController as Controller } from 'routing-controllers'

@Service()
@Controller('/account')
export class AccountController {}
