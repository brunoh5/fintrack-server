import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import { ZodError } from 'zod'
import morgan from 'morgan'

import { accountsRouter } from '@/http/controllers/accounts/routes'
import { categoriesRouter } from '@/http/controllers/categories/routes'
import { transactionsRouter } from '@/http/controllers/transactions/routes'
import { usersRouter } from '@/http/controllers/users/routes'
import { billsRouter } from './http/controllers/bills/routes'

import { AppError } from './AppError'
import { env } from './env'

export const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(
	cors({
		origin: env.CLIENT_URL,
	}),
)

app.use(usersRouter)
app.use(transactionsRouter)
app.use(accountsRouter)
app.use(categoriesRouter)
app.use(billsRouter)

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

	return res.status(500).json({ message: error.message })
})
