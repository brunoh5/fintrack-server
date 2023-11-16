import { Router } from 'express'
// import multer from 'multer'

// import { ImportExtractController } from '@/Controllers/ImportExtractController'
import { CreateTransaction } from '../controllers/create-transaction'
import { ListTransactionById } from '../controllers/list-transaction-by-id'

const transactionsRouter = Router()

// const upload = multer({
// 	dest: './tmp',
// })

// const importExtractController = new ImportExtractController()

const createTransaction = new CreateTransaction()
const listTransactionById = new ListTransactionById()

transactionsRouter.post('/', createTransaction.handle)
transactionsRouter.get('/:id', listTransactionById.handle)
// transactionsRouter.get('/', transactionsController.listByUserId)
// transactionsRouter.get('/:id', transactionsController.listById)

// transactionsRouter.post(
// 	'/:accountId/import',
// 	upload.single('file'),
// 	importExtractController.handle,
// )

export { transactionsRouter }
