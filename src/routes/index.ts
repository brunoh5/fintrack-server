import { Router } from 'express'
import { accountsRouter } from './accounts.routes'
import { usersRouter } from './users.routes'
import { statementsRouter } from './statements.routes'
import { ensureAuthenticated } from '@/ensureAuthenticated'

const router = Router()

router.use('/users', usersRouter)
router.use('/accounts', ensureAuthenticated, accountsRouter)
router.use('/statements', statementsRouter)

export { router }
