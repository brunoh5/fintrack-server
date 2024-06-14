import { Request, Response } from 'express'
import { z } from 'zod'

import { makeUpdateTransactionUseCase } from '@/use-cases/transactions/factories/makeUpdateTransactionUseCase'

export async function update(req: Request, res: Response) {
	const updateTransactionParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const createTransactionBodySchema = z.object({
		accountId: z.string().uuid(),
		name: z.string(),
		shopName: z.any().optional(),
		amount: z.coerce.number(),
		created_at: z.string().optional(),
		category: z
			.enum([
				'HOME',
				'FOOD',
				'TRANSPORTATION',
				'OTHERS',
				'ENTERTAINMENT',
				'SHOPPING',
			])
			.default('OTHERS'),
		payment_method: z
			.enum(['MONEY', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER'])
			.default('MONEY'),
	})

	const { category, name, shopName, amount, payment_method } =
		createTransactionBodySchema.parse(req.body)
	const { id } = updateTransactionParamsSchema.parse(req.params)

	const updateTransactionUseCase = makeUpdateTransactionUseCase()

	const { transaction } = await updateTransactionUseCase.execute({
		id,
		category,
		name,
		shopName,
		amount,
		payment_method,
	})

	return res.json({ transaction })
}
