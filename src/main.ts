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

app.listen(3001, () => console.log('Express Application started successfully!'))
