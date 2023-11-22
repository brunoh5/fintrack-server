import { makeUpdateTransactionUseCase } from '@/use-cases/factories/makeUpdateTransactionUseCase'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function update(req: Request, res: Response) {
	const updateTransactionParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const createTransactionBodySchema = z.object({
		categoryId: z.string().uuid(),
		name: z.string(),
		shopName: z.string(),
		amount: z.coerce.number(),
		paid_at: z.date().nullable(),
		type: z.enum(['received', 'sent']),
		payment_method: z.string(),
	})

	const { categoryId, name, shopName, amount, paid_at, type, payment_method } =
		createTransactionBodySchema.parse(req.body)
	const { id } = updateTransactionParamsSchema.parse(req.params)

	const updateTransactionUseCase = makeUpdateTransactionUseCase()

	const { transaction } = await updateTransactionUseCase.execute({
		transactionId: id,
		categoryId,
		name,
		shopName,
		amount,
		paid_at: paid_at ?? null,
		type,
		payment_method,
	})

	return res.json({ transaction })
}
