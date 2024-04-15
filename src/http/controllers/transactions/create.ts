import { Request, Response } from 'express'
import { z } from 'zod'

import { makeCreateTransactionUseCase } from '@/use-cases/factories/makeCreateTransactionUseCase'

export async function create(req: Request, res: Response): Promise<Response> {
	const createTransactionBodySchema = z.object({
		accountId: z.string().uuid(),
		name: z.string(),
		shopName: z.string(),
		amount: z.coerce.number(),
		transaction_type: z.enum(['CREDIT', 'DEBIT']),
		category: z.enum([
			'HOME',
			'FOOD',
			'TRANSPORTATION',
			'OTHERS',
			'ENTERTAINMENT',
			'SHOPPING',
		]),
		payment_method: z.enum([
			'MONEY',
			'PIX',
			'CREDIT_CARD',
			'DEBIT_CARD',
			'BANK_TRANSFER',
		]),
	})

	const {
		accountId,
		category,
		name,
		shopName,
		amount,
		transaction_type,
		payment_method,
	} = createTransactionBodySchema.parse(req.body)

	const createTransactionUseCase = makeCreateTransactionUseCase()

	const { transaction } = await createTransactionUseCase.execute({
		accountId,
		category,
		name,
		shopName,
		amount: amount * 100,
		transaction_type,
		payment_method,
		userId: req.user.sub,
	})

	return res.status(201).json({ transaction })
}
