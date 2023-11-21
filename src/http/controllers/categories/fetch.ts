import { makeFetchCategoriesUseCase } from '@/use-cases/factories/makeFetchCategoryUseCase'
import { Request, Response } from 'express'

export async function fetch(req: Request, res: Response): Promise<Response> {
	const fetchCategoriesUseCase = makeFetchCategoriesUseCase()

	const categories = await fetchCategoriesUseCase.execute()

	return res.json({ categories })
}
