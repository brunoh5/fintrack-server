import { Request, Response } from 'express'

import { makeFetchCategoriesMetrics } from '@/use-cases/factories/makeFetchCategoriesMetricsUseCase'

export async function fetchMetrics(
	req: Request,
	res: Response,
): Promise<Response> {
	const { sub: userId } = req.user

	const fetchCategoriesMetricsUseCase = makeFetchCategoriesMetrics()

	const categories = fetchCategoriesMetricsUseCase.execute({ userId })

	return res.json(categories)
}
