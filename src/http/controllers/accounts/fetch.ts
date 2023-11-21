import { makeFetchAccountsUseCase } from '@/use-cases/factories/makeFetchAccountsUseCase'
import { Request, Response } from 'express'

export async function fetch(req: Request, res: Response) {
	const listAllAccountsUseCase = makeFetchAccountsUseCase()

	const accounts = listAllAccountsUseCase.execute({ userId: req.user.sub })

	return res.json({ accounts })
}
