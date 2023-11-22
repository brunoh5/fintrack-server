import { Request, Response } from 'express'
import { z } from 'zod'

import { makeFetchTransactionUseCase } from '@/use-cases/factories/makeFetchTransactionsUseCase'

export async function fetch(req: Request, res: Response) {
	const fetchTransactionsParamsSchema = z.object({
		accountId: z.string().uuid(),
	})

	const { accountId } = fetchTransactionsParamsSchema.parse(req.params)

	const fetchTransactionUseCase = makeFetchTransactionUseCase()

	const { transactions } = await fetchTransactionUseCase.execute({
		accountId,
	})

	return res.status(200).json({ transactions })
}
