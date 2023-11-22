import { makeFetchAccountsUseCase } from '@/use-cases/factories/makeFetchAccountsUseCase'
import { Request, Response } from 'express'

export async function fetch(req: Request, res: Response) {
	const fetchAccountsUseCase = makeFetchAccountsUseCase()

	const { accounts } = await fetchAccountsUseCase.execute({
		userId: req.user.sub,
	})

	return res.json({ accounts })
}
