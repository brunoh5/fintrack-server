import { Request, Response } from 'express'
import { z } from 'zod'

import { makeUpdateTransactionUseCase } from '@/use-cases/factories/makeUpdateTransactionUseCase'

export async function update(req: Request, res: Response) {
	const updateTransactionParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const createTransactionBodySchema = z.object({
		categoryId: z.string().uuid(),
		name: z.string(),
		shopName: z.string(),
		amount: z.coerce.number(),
		transaction_type: z.enum(['CREDIT', 'DEBIT']),
		payment_method: z.enum([
			'MONEY',
			'PIX',
			'CREDIT_CARD',
			'DEBIT_CARD',
			'BANK_TRANSFER',
		]),
	})

	const {
		categoryId,
		name,
		shopName,
		amount,
		transaction_type,
		payment_method,
	} = createTransactionBodySchema.parse(req.body)
	const { id } = updateTransactionParamsSchema.parse(req.params)

	const updateTransactionUseCase = makeUpdateTransactionUseCase()

	const { transaction } = await updateTransactionUseCase.execute({
		transactionId: id,
		categoryId,
		name,
		shopName,
		amount,
		transaction_type,
		payment_method,
	})

	return res.json({ transaction })
}
