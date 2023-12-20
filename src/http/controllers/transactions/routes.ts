import { Router } from 'express'
import multer from 'multer'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetch } from './fetch'
import { get } from './get'
import { Import } from './import'
import { update } from './update'
import { fetchByUser } from './fetch-by-user'

const upload = multer({
	dest: './tmp',
})

const transactionsRouter = Router()

transactionsRouter.use(verifyJWT)

const importTransactions = new Import()

transactionsRouter.get('/users/transactions/metrics')
transactionsRouter.get('/users/transactions', fetchByUser)
transactionsRouter.put('/transactions/:id', update)
transactionsRouter.get('/transactions/:accountId/all', fetch)
transactionsRouter.get('/transactions/:id', get)
transactionsRouter.post('/transactions', create)
transactionsRouter.post(
	'/transactions/:accountId/import',
	upload.single('file'),
	importTransactions.handle,
)

export { transactionsRouter }
