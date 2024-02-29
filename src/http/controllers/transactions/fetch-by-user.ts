import { Request, Response } from 'express'
import { z } from 'zod'

import { makeFetchUserTransactionUseCase } from '@/use-cases/factories/makeFetchUserTransactionsUseCase'

export async function fetchByUser(req: Request, res: Response) {
	const fetchByUserQuerySchema = z.object({
		transaction_type: z.enum(['DEBIT', 'CREDIT']),
		page: z.coerce.number().default(1),
		limit: z.optional(z.coerce.number()),
	})

	const { transaction_type, page, limit } = fetchByUserQuerySchema.parse(
		req.query,
	)

	const fetchUserTransactionUseCase = makeFetchUserTransactionUseCase()

	const { transactions } = await fetchUserTransactionUseCase.execute({
		userId: req.user.sub,
		transaction_type,
		page,
		limit,
	})

	return res.status(200).json({ transactions })
}
