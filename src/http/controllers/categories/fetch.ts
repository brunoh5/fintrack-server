import { Request, Response } from 'express'

import { makeFetchCategoriesUseCase } from '@/use-cases/factories/makeFetchCategoryUseCase'

export async function fetch(req: Request, res: Response): Promise<Response> {
	const fetchCategoriesUseCase = makeFetchCategoriesUseCase()

	const categories = fetchCategoriesUseCase.execute()

	return res.json(categories)
}
