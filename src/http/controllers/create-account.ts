import { Request, Response } from 'express'
import { z } from 'zod'

import { CreateAccountUseCase } from '@/use-cases/create-account'

export class CreateAccount {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.user

		const createAccountBodySchema = z.object({
			type: z.string(),
			bank: z.string(),
			number: z.string().nullable(),
			initialAmount: z.number().default(0),
		})

		const { type, bank, number, initialAmount } = createAccountBodySchema.parse(
			req.body,
		)

		const createAccountUseCase = new CreateAccountUseCase()

		const account = await createAccountUseCase.execute({
			type,
			bank,
			number,
			initialAmount,
			userId: id,
		})

		return res.status(201).json({ account })
	}
}
