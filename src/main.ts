import 'reflect-metadata'
import express from 'express'
import Container from 'typedi'
import { ErrorMiddleware } from './middlewares/error'
import { UserController } from './controllers/user.controller'
import { useContainer, useExpressServer } from 'routing-controllers'

useContainer(Container)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

useExpressServer(app, {
  routePrefix: '/api',
  defaultErrorHandler: false,
  controllers: [UserController],
  middlewares: [ErrorMiddleware],
})

// return unverified after creating account
// require user to validate their email address
// create unique account (number) linked to the useer
// require user to link a valid credit card to their account
// require user to create a unique pin for carrying out their transaction

// require validation before sending/receiving money

// validate account before to ensure validated before sending money

app.listen(3001, () => console.log('Express Application started successfully!'))
