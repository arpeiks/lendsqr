import { Service } from 'typedi'
import { logger } from '@utils/logger'
import { Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Service()
@Middleware({ type: 'after' })
export class NotFoundMiddleware implements ExpressMiddlewareInterface {
  use(_req: Request, res: Response): any {
    const error = {
      errors: [],
      statusCode: 404,
      name: 'NotFound',
      message: `The requested resource could not be found or hasn't been implemented yet.`,
    }

    res.status(404).json(error)
    logger.error(error)
  }
}
