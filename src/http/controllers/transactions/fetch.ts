import { Request, Response } from 'express'
import { z } from 'zod'

import { makeFetchTransactionsUseCase } from '@/use-cases/transactions/factories/makeFetchTransactionsUseCase'

export async function fetch(req: Request, res: Response) {
	const fetchTransactionQuerySchema = z.object({
		pageIndex: z.coerce.number().default(0).optional(),
		accountId: z.string().optional(),
		name: z.string().optional(),
		transaction_type: z.enum(['DEBIT', 'CREDIT']).optional(),
		from: z.string().optional(),
		to: z.string().optional(),
		category: z
			.enum([
				'HOME',
				'FOOD',
				'TRANSPORTATION',
				'OTHERS',
				'ENTERTAINMENT',
				'SHOPPING',
			])
			.optional(),
		payment_method: z
			.enum(['MONEY', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER'])
			.optional(),
	})

	const {
		transaction_type,
		pageIndex,
		accountId,
		name,
		category,
		payment_method,
		from,
		to,
	} = fetchTransactionQuerySchema.parse(req.query)

	const fetchTransactionUseCase = makeFetchTransactionsUseCase()

	const result = await fetchTransactionUseCase.execute({
		userId: req.user.sub,
		name,
		transaction_type,
		pageIndex,
		accountId,
		category,
		payment_method,
		from,
		to,
	})

	return res.status(200).json(result)
}
