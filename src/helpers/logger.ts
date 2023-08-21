import { createLogger, format, transports } from 'winston'
const { combine, printf } = format
import config from 'config'

const lFormat = printf((info) => {
  return `${info.level.toUpperCase()}: ${info.message}`
})

const logger = createLogger({
  level: config.get('logs.level'),
  format: combine(format.splat(), lFormat),
  transports: [new transports.Console()],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  )
}

export default logger
