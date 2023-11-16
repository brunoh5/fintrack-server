import { Request, Response } from 'express'
import { z } from 'zod'

import { RegisterUserUseCase } from '@/use-cases/register-user'

export class RegisterUser {
	async handle(req: Request, res: Response): Promise<Response> {
		const registerUserBodySchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string(),
		})

		const { name, email, password } = registerUserBodySchema.parse(req.body)

		const registerUserUseCase = new RegisterUserUseCase()

		const { token, user } = await registerUserUseCase.execute({
			name,
			email,
			password,
		})

		return res.status(201).json({ token, user })
	}
}
