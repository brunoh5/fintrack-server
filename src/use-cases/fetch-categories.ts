import { Category } from '@prisma/client'

import { CategoriesRepository } from '@/repositories/categories-repository'

interface FetchCategoryUseCaseResponse {
	categories: Category[]
}

export class FetchCategoriesUseCase {
	constructor(private categoriesRepository: CategoriesRepository) {}

	async execute(): Promise<FetchCategoryUseCaseResponse> {
		const categories = await this.categoriesRepository.findMany()

		// console.log(categories)

		return { categories }
	}
}
