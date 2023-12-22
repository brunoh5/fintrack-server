/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { AppError } from './AppError'
import { ZodError } from 'zod'

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

	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			message: error.message,
		})
	}

	return res.status(500).json({ message: error.message })
}
