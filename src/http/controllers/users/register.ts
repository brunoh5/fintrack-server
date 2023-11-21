import { Request, Response } from 'express'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/makeRegisterUseCase'

export async function register(req: Request, res: Response) {
	const registerUserBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string(),
	})

	const { name, email, password } = registerUserBodySchema.parse(req.body)

	try {
		const registerUseCase = makeRegisterUseCase()

		await registerUseCase.execute({
			name,
			email,
			password,
		})
	} catch (err) {
		if (err instanceof UserAlreadyExistsError) {
			return res.status(409).json({ message: err.message })
		}

		throw err
	}

	return res.status(201).send()
}
