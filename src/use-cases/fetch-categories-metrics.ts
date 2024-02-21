import { CategoriesRepository } from '@/repositories/categories-repository'
import { FindManyMetrics } from '@/repositories/prisma/prisma-categories-repository'

interface FetchCategoriesMetricsUseCaseRequest {
	userId: string
}

export class FetchCategoriesMetrics {
	constructor(private categoriesRepository: CategoriesRepository) {}

	async execute({
		userId,
	}: FetchCategoriesMetricsUseCaseRequest): Promise<any> {
		const categories =
			await this.categoriesRepository.findManyWithTransactions(userId)

		return categories
	}
}
