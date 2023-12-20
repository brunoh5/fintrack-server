import { makeFetchMonthlyMetricsByYearUseCase } from '@/use-cases/factories/makeMonthlyExpenseUseCase'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function fetchExpenses(req: Request, res: Response) {
	const { sub: userId } = req.user

	const date = new Date()

	const fetchExpensesQuerySchema = z.object({
		year: z.coerce.number().default(date.getUTCFullYear()),
	})

	const { year } = fetchExpensesQuerySchema.parse(req.query)

	const useCase = makeFetchMonthlyMetricsByYearUseCase()

	const { monthlyExpenses } = await useCase.execute({ userId, year })

	return res.json({ monthlyExpenses })
}
