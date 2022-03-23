import express from 'express'
import user from './routes/user'

const app = express()

app.get('/', (_req, res) => res.send('Hello World!'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', user)

app.listen(3000, () => console.log('Express Application started successfully!'))
