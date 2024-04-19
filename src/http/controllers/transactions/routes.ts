import { Router } from 'express'

// import multer from 'multer'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { deleteTransaction } from './delete'
import { fetch } from './fetch'
import { get } from './get'
// import { Import } from './import'
import { metrics } from './metrics'
import { monthlyExpensesByYear } from './monthly-expenses-by-year'
import { update } from './update'

// const upload = multer({
// 	dest: './tmp',
// })

const transactionsRouter = Router()

transactionsRouter.use(verifyJWT)

// const importTransactions = new Import()

transactionsRouter.get('/transactions/monthly-expenses', monthlyExpensesByYear)
transactionsRouter.get('/transactions/metrics', metrics)
transactionsRouter.get('/transactions', fetch)
transactionsRouter.post('/transactions', create)

transactionsRouter.put('/transactions/:id', update)
transactionsRouter.get('/transactions/:id', get)
transactionsRouter.delete('/transactions/:id/delete', deleteTransaction)

// transactionsRouter.post(
// 	'/transactions/:accountId/import',
// 	upload.single('file'),
// 	importTransactions.handle,
// )

export { transactionsRouter }
