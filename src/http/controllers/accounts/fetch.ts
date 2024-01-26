import { Request, Response } from 'express'

import { makeFetchAccountsUseCase } from '@/use-cases/factories/makeFetchAccountsUseCase'

export async function fetch(req: Request, res: Response) {
	const fetchAccountsUseCase = makeFetchAccountsUseCase()

	const { accounts } = await fetchAccountsUseCase.execute({
		userId: req.user.sub,
	})

	return res.json({ accounts })
}
