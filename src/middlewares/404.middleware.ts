import { Service } from 'typedi'
import { logger } from '@utils/logger'
import { Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Service()
@Middleware({ type: 'after' })
export class NotFoundMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response): any {
    logger.error(`404 not found`)
    console.log(req.body)
    return res.status(404).json({ error: 'Not Found' })
  }
}
