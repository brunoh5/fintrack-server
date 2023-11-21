import { Request, Response } from 'express'
import { z } from 'zod'

import { makeFetchTransactionUseCase } from '@/use-cases/factories/makeFetchTransactionsUseCase'

export async function fetch(req: Request, res: Response) {
	const fetchTransactionsParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = fetchTransactionsParamsSchema.parse(req.params)

	const fetchTransactionUseCase = makeFetchTransactionUseCase()

	const { transactions } = await fetchTransactionUseCase.execute({
		accountId: id,
	})

	return res.json({ transactions })
}
