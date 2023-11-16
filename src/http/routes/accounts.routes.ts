import { Router } from 'express'

import { ListAllAccounts } from '../controllers/list-all-accounts'
import { ListAccount } from '../controllers/list-account'
import { DeleteAccount } from '../controllers/delete-account'
import { CreateAccount } from '../controllers/create-account'
import { UpdateAccountById } from '../controllers/update-account-by-id'
import { BalanceController } from '../controllers/BalanceController'

const accountsRouter = Router()

const balanceController = new BalanceController()

const createAccount = new CreateAccount()
const updateAccountById = new UpdateAccountById()
const deleteAccount = new DeleteAccount()
const listAllAccounts = new ListAllAccounts()
const listAccount = new ListAccount()

accountsRouter.post('/', createAccount.handle)
accountsRouter.get('/', listAllAccounts.handle)
accountsRouter.get('/:id', listAccount.handle)
accountsRouter.put('/:id', updateAccountById.handle)
accountsRouter.delete('/', deleteAccount.handle)

accountsRouter.get('/:id/balance', balanceController.handle)

export { accountsRouter }
