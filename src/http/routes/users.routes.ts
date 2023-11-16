import { Router } from 'express'
import { RegisterUser } from '../controllers/register-user'
import { AuthenticateUser } from '../controllers/authenticate-user'

const usersRouter = Router()

const registerUser = new RegisterUser()
const authenticateUser = new AuthenticateUser()

usersRouter.post('/create', registerUser.handle)
usersRouter.post('/session', authenticateUser.handle)

export { usersRouter }
