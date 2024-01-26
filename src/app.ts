import 'express-async-errors'
import 'reflect-metadata'

import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { accountsRouter } from '@/http/controllers/accounts/routes'
import { categoriesRouter } from '@/http/controllers/categories/routes'
import { transactionsRouter } from '@/http/controllers/transactions/routes'
import { usersRouter } from '@/http/controllers/users/routes'

import { errorHandler } from './error-handler'
import { billsRouter } from './http/controllers/bills/routes'

export const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(cors())

app.use(usersRouter)
app.use(transactionsRouter)
app.use(accountsRouter)
app.use(categoriesRouter)
app.use(billsRouter)

app.use(errorHandler)
