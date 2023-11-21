import { beforeEach, describe, expect, it } from 'vitest'

import { CategoriesRepository } from '@/repositories/categories-repository'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { GetCategoryUseCase } from './get-category'

let categoriesRepository: CategoriesRepository
let sut: GetCategoryUseCase

describe('Get Category Use Case', () => {
	beforeEach(() => {
		categoriesRepository = new InMemoryCategoriesRepository()
		sut = new GetCategoryUseCase(categoriesRepository)
	})

	it('should be able to get a category', async () => {
		const createdCategory = await categoriesRepository.create({
			name: 'category-01',
		})

		const { category } = await sut.execute({ categoryId: createdCategory.id })

		expect(category.id).toEqual(createdCategory.id)
	})
})
