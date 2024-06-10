import { Request, Response } from 'express'
import { z } from 'zod'

import { makeUpdateAccountUseCase } from '@/use-cases/factories/makeUpdateAccountUseCase'

export async function update(req: Request, res: Response): Promise<Response> {
	const updateAccountParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const updateAccountBodySchema = z.object({
		type: z.string(),
		bank: z.string(),
		number: z.string().optional(),
	})

	const { id } = updateAccountParamsSchema.parse(req.params)

	const { type, bank, number } = updateAccountBodySchema.parse(req.body)

	const updateAccountByIdUseCase = makeUpdateAccountUseCase()

	const { account } = await updateAccountByIdUseCase.execute({
		accountId: id,
		type,
		bank,
		number: number ?? '',
	})

	return res.status(200).json({ account })
}
