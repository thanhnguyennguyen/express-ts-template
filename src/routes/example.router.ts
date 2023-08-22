import express, { NextFunction, Request, Response } from 'express'

import { query, validationResult } from 'express-validator'
import ExampleController from '../controllers/example.controller'

const exampleApi = express.Router()

exampleApi.get(
  '/ex1',
  query('timestampFrom').isNumeric(),
  query('timestampTo').isNumeric(),
  async (req: Request, res: Response, _next: NextFunction) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) {
      return res.status(406).send({ errors: valid.array() })
    }
    const c = new ExampleController()
    const result = await c.getEx1(Number(req.query?.timestampFrom), Number(req.query?.timestampTo))
    return res.json(result)
  },
)

export default exampleApi
