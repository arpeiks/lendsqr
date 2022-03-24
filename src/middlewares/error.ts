import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from 'routing-controllers'

import { Response } from 'express'
import createError from 'http-errors'
import { Service } from 'typedi'
import { Format } from '../utils/format-error'
import { ValidationError } from 'class-validator'

@Service()
@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(err: any, _req: any, res: Response): void {
    //

    const code = err.httpCode
    const message = err.message
    let errors = err?.errors || []

    if (errors[0] instanceof ValidationError) errors = Format.error(errors)

    this.handleError(code, message, errors, res)
  }

  handleError(code: number, message: string, errors: any[], res: Response) {
    const error = createError(code, message, { errors })

    console.log({ ...error })

    const err = {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      errors,
    }

    res.status(code).send(err)
  }
}
