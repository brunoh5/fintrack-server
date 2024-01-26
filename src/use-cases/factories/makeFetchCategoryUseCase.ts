import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'

import { FetchCategoriesUseCase } from '../fetch-categories'

export function makeFetchCategoriesUseCase() {
	const categoriesRepository = new PrismaCategoriesRepository()
	const useCase = new FetchCategoriesUseCase(categoriesRepository)

	return useCase
}
