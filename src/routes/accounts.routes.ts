import { Router } from 'express'

import { AccountsController } from '@/Controllers/AccountsController'
import { BalanceController } from '@/Controllers/BalanceController'

const accountsRouter = Router()

const accountsController = new AccountsController()
const balanceController = new BalanceController()

accountsRouter.post('/', accountsController.create)
accountsRouter.get('/all', accountsController.listAll)
accountsRouter.get('/:id', accountsController.list)
accountsRouter.put('/', accountsController.update)
accountsRouter.delete('/', accountsController.delete)

accountsRouter.get('/:id/balance', balanceController.handle)

export { accountsRouter }
