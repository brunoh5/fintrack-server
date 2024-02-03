/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { env } from './env'

export function errorHandler(
	error: Error,
	__: Request,
	res: Response,
	_: NextFunction,
) {
	if (error instanceof ZodError) {
		return res
			.status(400)
			.send({ message: 'Validation error.', issues: error.format() })
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error)
	}

	return res.status(500).json({ message: 'Internal server Error' })
}
