import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { GetCategoryUseCase } from '../get-category'

export function makeGetCategoryUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository()
	const useCase = new GetCategoryUseCase(categoriesRepository)

	return useCase
}
