import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers'

import { Service } from 'typedi'
import createError from 'http-errors'
import { logger } from '@utils/logger'
import { Request, Response } from 'express'
import { Format } from '../utils/format-error'
import { ValidationError } from 'class-validator'

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

    let err = {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      errors,
    }

    if (err.statusCode === 404) {
      err = {
        errors: [],
        statusCode: 404,
        name: 'NotFound',
        message: `The requested resource could not be found or hasn't been implemented yet.`,
      }
    }

    logger.error({ ...err })
    return res.status(code).json(err)
  }
}
