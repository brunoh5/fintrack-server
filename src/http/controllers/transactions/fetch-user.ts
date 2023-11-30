import { Request, Response } from 'express'

import { makeFetchUserTransactionUseCase } from '@/use-cases/factories/makeFetchUserTransactionsUseCase'

export async function fetchUser(req: Request, res: Response) {
	const fetchUserTransactionUseCase = makeFetchUserTransactionUseCase()

	const { transactions } = await fetchUserTransactionUseCase.execute({
		userId: req.user.sub,
	})

	return res.status(200).json({ transactions })
}
