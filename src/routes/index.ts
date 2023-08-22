import { Router } from 'express'
import { accountsRouter } from './accounts.routes'
import { usersRouter } from './users.routes'
import { transactionsRouter } from './transactions.routes'
import { ensureAuthenticated } from '@/ensureAuthenticated'

const router = Router()

router.use('/users', usersRouter)
router.use('/accounts', ensureAuthenticated, accountsRouter)
router.use('/transactions', ensureAuthenticated, transactionsRouter)

export { router }
