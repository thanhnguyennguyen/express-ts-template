import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
const app: Express = express()
import config from 'config'
import http from 'http'
import errorHandler from './middlewares/error'
import router from './apis/index'

// cors
app.use(cors())
app.use(helmet())

app.use(express.json())

app.set('trust proxy', 1)

const server = new http.Server(app)

app.use(router)

// error handler
app.use(errorHandler)

server.listen(
  config.get('server.port'),
  config.get('server.host'),
  function () {
    console.log(
      'App listening at %s:%s',
      config.get('server.host'),
      config.get('server.port'),
    )
  },
)
