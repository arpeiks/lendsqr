import 'reflect-metadata'
import morgan from 'morgan'
import express from 'express'
import session from 'express-session'
import Container from 'typedi'
import { logger, morganStream } from '@utils/logger'
import { UserController } from '@user/user.controller'
import { ErrorMiddleware } from '@middlewares/error.middleware'
import { AccountController } from '@account/account.controller'
import { useContainer, useExpressServer } from 'routing-controllers'
import { CardController } from 'modules/card/card.controller'

useContainer(Container)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined', { stream: morganStream }))
app.use(
  session({
    resave: false,
    secret: 'keyboard_cat',
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  }),
)

useExpressServer(app, {
  routePrefix: '/api',
  defaultErrorHandler: false,
  middlewares: [ErrorMiddleware],
  controllers: [CardController, UserController, AccountController],
})

// return unverified after creating account
// require user to validate their email address
// create unique account (number) linked to the useer
// require user to link a valid credit card to their account
// require user to create a unique pin for carrying out their transaction

// require validation before sending/receiving money

// validate account before to ensure validated before sending money

app.listen(3000, () => logger.info('Lendsqr application successfully started'))
