import { beforeEach, describe, expect, it } from 'vitest'

import { CategoriesRepository } from '@/repositories/categories-repository'
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'

import { FetchCategoriesUseCase } from './fetch-categories'

let categoriesRepository: CategoriesRepository
let sut: FetchCategoriesUseCase

describe('Fetch Categories Use Case', () => {
	beforeEach(() => {
		categoriesRepository = new InMemoryCategoriesRepository()
		sut = new FetchCategoriesUseCase(categoriesRepository)
	})

	it('should be able to fetch categories', async () => {
		await categoriesRepository.create({
			name: 'category-01',
		})

		await categoriesRepository.create({
			name: 'category-02',
		})

		const { categories } = await sut.execute()

		expect(categories).toHaveLength(2)
		expect(categories).toEqual([
			expect.objectContaining({ name: 'category-01' }),
			expect.objectContaining({ name: 'category-02' }),
		])
	})
})
