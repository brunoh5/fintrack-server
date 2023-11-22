import { Request, Response } from 'express'
import { z } from 'zod'

import { makeCreateAccountUseCase } from '@/use-cases/factories/makeCreateAccountUseCase'

export async function create(req: Request, res: Response) {
	const createAccountBodySchema = z.object({
		type: z.string(),
		bank: z.string(),
		number: z.string().nullable(),
		initialAmount: z.number().default(0),
	})

	const { type, bank, number, initialAmount } = createAccountBodySchema.parse(
		req.body,
	)

	const createAccountUseCase = makeCreateAccountUseCase()

	const { account } = await createAccountUseCase.execute({
		type,
		bank,
		number,
		balance: initialAmount,
		userId: req.user.sub,
	})

	return res.status(201).json({ account })
}
