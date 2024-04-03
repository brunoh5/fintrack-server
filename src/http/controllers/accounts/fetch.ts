import { Request, Response } from 'express'

import { makeFetchAccountsUseCase } from '@/use-cases/factories/makeFetchAccountsUseCase'

export async function fetch(req: Request, res: Response) {
	const fetchAccountsUseCase = makeFetchAccountsUseCase()

	const resume = await fetchAccountsUseCase.execute({
		userId: req.user.sub,
	})

	console.log(resume)

	return res.json(resume)
}
