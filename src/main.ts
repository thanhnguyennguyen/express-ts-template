import express, { Express } from 'express'
import cors from 'cors'
import helmet from 'helmet'
const app: Express = express()
import { stream } from './helpers/logger'
import morgan from 'morgan'
import config from 'config'
import http from 'http'
import errorHandler from './middlewares/error'
import router from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../swagger/swagger.json'

// cors
app.use(cors())
app.use(helmet())

app.use(express.json())

app.set('trust proxy', 1)

const server = new http.Server(app)

app.use(router)
app.use(morgan('short', { stream }))

if (process.env.NODE_ENV != 'production') {
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, {
      customSiteTitle: 'API Docs',
      customCss: ` .topbar {display: none;}
      .title {
        display: flex;
        align-items: center
      }`,
    }),
  )
}

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
