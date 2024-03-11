import 'express-async-errors'
import 'reflect-metadata'

import cors from 'cors'
import express, { Response } from 'express'
import morgan from 'morgan'

import { accountsRouter } from '@/http/controllers/accounts/routes'
import { billsRouter } from '@/http/controllers/bills/routes'
import { transactionsRouter } from '@/http/controllers/transactions/routes'
import { usersRouter } from '@/http/controllers/users/routes'

import { errorHandler } from './error-handler'

export const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(cors())

app.use(usersRouter)
app.use(transactionsRouter)
app.use(accountsRouter)
app.use(billsRouter)

app.use((_, res: Response) => {
	return res.status(404).send({ message: 'Rota não encontrada' })
})

app.use(errorHandler)
