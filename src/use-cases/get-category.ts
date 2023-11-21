import { Category } from '@prisma/client'

import { CategoriesRepository } from '@/repositories/categories-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetCategoryUseCaseRequest {
	categoryId: string
}

interface GetCategoryUseCaseResponse {
	category: Category
}

export class GetCategoryUseCase {
	constructor(private categoriesRepository: CategoriesRepository) {}

	async execute({
		categoryId,
	}: GetCategoryUseCaseRequest): Promise<GetCategoryUseCaseResponse> {
		const category = await this.categoriesRepository.findById(categoryId)

		if (!category) {
			throw new ResourceNotFoundError()
		}

		return { category }
	}
}
