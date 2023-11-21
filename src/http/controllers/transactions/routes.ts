import { Router } from 'express'
import multer from 'multer'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetch } from './fetch'
import { get } from './get'
import { Import } from './import'
import { update } from './update'

const upload = multer({
	dest: './tmp',
})

const transactionsRouter = Router()

transactionsRouter.use(verifyJWT)

const importTransactions = new Import()

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
