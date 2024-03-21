import { Request, Response } from 'express'
import { z } from 'zod'

import { makeFetchUserTransactionUseCase } from '@/use-cases/factories/makeFetchUserTransactionsUseCase'

export async function fetchByUser(req: Request, res: Response) {
	const fetchByUserQuerySchema = z.object({
		transaction_type: z.enum(['DEBIT', 'CREDIT']).optional(),
		pageIndex: z.coerce.number().default(0),
	})

	const { transaction_type, pageIndex } = fetchByUserQuerySchema.parse(
		req.query,
	)

	const fetchUserTransactionUseCase = makeFetchUserTransactionUseCase()

	const { transactions, meta } = await fetchUserTransactionUseCase.execute({
		userId: req.user.sub,
		transaction_type,
		pageIndex,
	})

	return res.status(200).json({ transactions, meta })
}
