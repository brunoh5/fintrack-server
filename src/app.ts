import 'express-async-errors'
import 'reflect-metadata'

import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { accountsRouter } from '@/http/controllers/accounts/routes'
import { categoriesRouter } from '@/http/controllers/categories/routes'
import { transactionsRouter } from '@/http/controllers/transactions/routes'
import { usersRouter } from '@/http/controllers/users/routes'
import { billsRouter } from './http/controllers/bills/routes'

import { env } from './env'
import { errorHandler } from './error-handler'

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

app.use(errorHandler)
