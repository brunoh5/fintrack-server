import { Request, Response } from 'express'

import { makeFetchCurrentExpenses } from '@/use-cases/factories/makeFetchCurrentExpensesUseCase'

export async function metrics(req: Request, res: Response) {
	const { sub: userId } = req.user

	const fetchCurrentExpenses = makeFetchCurrentExpenses()

	const metrics = await fetchCurrentExpenses.execute({
		userId,
	})

	return res.send({ metrics })
}
