import { Request } from 'express'

export const apiUrl = (req: Request) => {
  return req.protocol + '://' + req.get('host') + req.originalUrl
}
