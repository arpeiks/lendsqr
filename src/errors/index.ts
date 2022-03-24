import { HttpError } from 'routing-controllers'

export class ConflictError extends HttpError {
  public errors: string[]

  constructor(errors: string[]) {
    super(409, 'ConflictError')
    this.errors = errors
  }

  toJSON() {
    return {
      httpCode: 409,
      errors: this.errors,
      message: 'ConflictError',
    }
  }
}
