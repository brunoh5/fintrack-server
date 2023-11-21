import { makeUpdateAccountUseCase } from '@/use-cases/factories/makeUpdateAccountUseCase'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response): Promise<Response> {
	const updateAccountParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const updateAccountBodySchema = z.object({
		type: z.string(),
		bank: z.string(),
		number: z.string().nullable(),
	})

	const { id } = updateAccountParamsSchema.parse(req.params)

	const { type, bank, number } = updateAccountBodySchema.parse(req.body)

	const updateAccountByIdUseCase = makeUpdateAccountUseCase()

	const account = await updateAccountByIdUseCase.execute({
		accountId: id,
		type,
		bank,
		number,
	})

	return res.status(201).json({ account })
}
