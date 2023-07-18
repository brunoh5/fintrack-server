import { Router } from 'express'

import { AccountsController } from '@/Controllers/AccountsController'

const accountsRouter = Router()

const accountsController = new AccountsController()

accountsRouter.post('/', accountsController.create)
accountsRouter.get('/all', accountsController.listAll)
accountsRouter.get('/', accountsController.list)
accountsRouter.put('/', accountsController.update)
accountsRouter.delete('/', accountsController.delete)

export { accountsRouter }
