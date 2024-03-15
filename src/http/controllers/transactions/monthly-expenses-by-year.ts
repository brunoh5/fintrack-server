import { Request, Response } from 'express'

import { makeFetchMonthlyMetricsByYearUseCase } from '@/use-cases/factories/makeMonthlyExpenseUseCase'

export async function monthlyExpensesByYear(req: Request, res: Response) {
	const { sub: userId } = req.user

	const monthlyExpensesByYear = makeFetchMonthlyMetricsByYearUseCase()

	const expenses = await monthlyExpensesByYear.execute({
		userId,
		year: new Date().getFullYear(),
	})

	return res.json({ monthlyExpenses: expenses })
}
