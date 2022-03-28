import winston from 'winston'

const env = process.env.NODE_ENV
const prodLogFile = 'logs/stack.log'
const write = (message: string) => logger.http(message)

const format = winston.format.printf(
  (info: winston.Logform.TransformableInfo) => {
    return `[${info.level.toUpperCase()}] ${info.timestamp} - ${info.message}`
  },
)

winston.addColors({ info: 'cyan', http: 'magenta' })

const devLogger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp(),
    format,
    winston.format.colorize({ all: true }),
  ),
  transports: new winston.transports.Console(),
})

const prodLogger = winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: new winston.transports.File({
    filename: prodLogFile,
  }),
})

export const morganStream = { write }
export const logger = env !== 'production' ? devLogger : prodLogger
