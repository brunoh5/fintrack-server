import 'reflect-metadata'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { AppError } from './AppError'
import { ZodError } from 'zod'
import { router } from './http/routes'

export const app = express()

app.use(express.json())

app.use(cors())
app.use(router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, __: Request, res: Response, _: NextFunction) => {
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

	return res.status(500).json({ message: 'Internal server error' })
})
