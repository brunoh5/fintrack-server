import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'

import { FetchCategoriesMetrics } from '../fetch-categories-metrics'

export function makeFetchCategoriesMetrics() {
	const categoriesRepository = new PrismaCategoriesRepository()
	const useCase = new FetchCategoriesMetrics(categoriesRepository)

	return useCase
}
