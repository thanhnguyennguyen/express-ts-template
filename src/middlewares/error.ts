import { NextFunction, Request, Response } from 'express'
import logger from '../helpers/logger'
import map from 'lodash.map'

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const errorHandler = function (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
): any {
  if (err) {
    if (err === true) err = {}
    err.status = err.status || 400
    err.message = err.message || map(err, 'msg')[0] || 'Bad request'

    const code = parseInt(err.status)
    if (code >= 500 && code < 600) {
      logger.error(err)
      console.trace(err)
    }

    return res.status(err.status).json({
      status: err.status,
      error: { message: err.message },
    })
  }
  return next()
}

export default errorHandler
