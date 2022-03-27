import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers'

import { Service } from 'typedi'
import { Request, Response } from 'express'
import createError from 'http-errors'
import { Format } from '../utils/format-error'
import { ValidationError } from 'class-validator'
import { logger } from '@utils/logger'

@Service()
@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(err: any, _req: Request, res: Response): void {
    const code = err.httpCode
    let errors = err?.errors || []
    const message = err.message || 'Something went wrong'

    if (errors[0] instanceof ValidationError) errors = Format.error(errors)

    this.handleError(code, message, errors, res)
  }

  handleError(code: number, message: string, errors: any[], res: Response) {
    const error = createError(code, message, { errors })

    const err = {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      errors,
    }

    logger.error(err)
    console.log(res.header)
  }
}
