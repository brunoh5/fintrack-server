import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'

import { env } from '@/env'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/makeAuthenticateUseCase'

export async function authenticate(req: Request, res: Response) {
	const registerUserBodySchema = z.object({
		email: z.string().email(),
		password: z.string(),
	})

	const { email, password } = registerUserBodySchema.parse(req.body)

	try {
		const authenticateUseCase = makeAuthenticateUseCase()

		const { user } = await authenticateUseCase.execute({
			email,
			password,
		})

		const token = sign({}, env.JWT_SECRET, { subject: user.id })

		return res.status(200).json({ token })
	} catch (err) {
		if (err instanceof InvalidCredentialsError) {
			return res.status(400).json({ message: err.message })
		}

		throw err
	}
}
