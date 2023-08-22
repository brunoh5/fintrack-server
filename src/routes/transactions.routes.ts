import { Router } from 'express'
import multer from 'multer'

import { ImportExtractController } from '@/Controllers/ImportExtractController'

const transactionsRouter = Router()

const upload = multer({
	dest: './tmp',
})

const importExtractController = new ImportExtractController()

// accountsRouter.get('/', listAccountController.handle)
transactionsRouter.post(
	'/import',
	upload.single('file'),
	importExtractController.handle,
)

export { transactionsRouter }
