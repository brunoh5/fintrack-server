import { Router } from 'express'
import multer from 'multer'

import { ImportExtractController } from '@/Controllers/ImportExtractController'
import { TransactionsController } from '@/Controllers/TransactionsController'

const transactionsRouter = Router()

const upload = multer({
	dest: './tmp',
})

const importExtractController = new ImportExtractController()
const transactionsController = new TransactionsController()

transactionsRouter.get('/', transactionsController.list)
transactionsRouter.get('/listAll', transactionsController.list)

transactionsRouter.post('/', transactionsController.create)

transactionsRouter.post(
	'/:accountId/import',
	upload.single('file'),
	importExtractController.handle,
)

export { transactionsRouter }
