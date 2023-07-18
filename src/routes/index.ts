import { Router } from 'express'
import { accountsRouter } from './accounts.routes'
import { statementsRouter } from './statements.routes'

const router = Router()

router.use('/accounts', accountsRouter)
router.use('/statements', statementsRouter)

export { router }
