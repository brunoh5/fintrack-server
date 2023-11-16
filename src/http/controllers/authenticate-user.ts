import { Request, Response } from 'express'
import { z } from 'zod'

import { AuthenticateUserUseCase } from '@/use-cases/authenticate-user'

export class AuthenticateUser {
	async handle(req: Request, res: Response): Promise<Response> {
		const registerUserBodySchema = z.object({
			email: z.string().email(),
			password: z.string(),
		})

		const { email, password } = registerUserBodySchema.parse(req.body)

		const authenticateUserUseCase = new AuthenticateUserUseCase()

		const { token, user } = await authenticateUserUseCase.execute({
			email,
			password,
		})

		return res.json({ token, user })
	}
}
