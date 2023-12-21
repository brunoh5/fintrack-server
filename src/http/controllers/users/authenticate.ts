import { env } from '@/env'
import { makeAuthenticateUseCase } from '@/use-cases/factories/makeAuthenticateUseCase'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'

export async function authenticate(req: Request, res: Response) {
	const registerUserBodySchema = z.object({
		email: z.string().email(),
		password: z.string(),
	})

	const { email, password } = registerUserBodySchema.parse(req.body)

	const authenticateUseCase = makeAuthenticateUseCase()

	const { user } = await authenticateUseCase.execute({
		email,
		password,
	})

	const token = sign({}, env.JWT_SECRET, { subject: user.id })

	return res.json({ token })
}
