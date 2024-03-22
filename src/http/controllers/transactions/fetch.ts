import { Request, Response } from 'express'
import { z } from 'zod'

import { makeFetchTransactionsUseCase } from '@/use-cases/factories/makeFetchTransactionsUseCase'

export async function fetch(req: Request, res: Response) {
	const fetchTransactionQuerySchema = z.object({
		transaction_type: z.enum(['DEBIT', 'CREDIT']).optional(),
		pageIndex: z.coerce.number().default(0).optional(),
		accountId: z.string().optional(),
	})

	const { transaction_type, pageIndex, accountId } =
		fetchTransactionQuerySchema.parse(req.query)

	const fetchTransactionUseCase = makeFetchTransactionsUseCase()

	const { transactions, meta } = await fetchTransactionUseCase.execute({
		userId: req.user.sub,
		transaction_type,
		pageIndex,
		accountId,
	})

	return res.status(200).json({ transactions, meta })
}
