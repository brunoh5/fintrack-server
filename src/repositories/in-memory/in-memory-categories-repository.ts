import { Category, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { CategoriesRepository } from '../categories-repository'
import { FindManyMetrics } from '../prisma/prisma-categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
	public items: Category[] = []

	async findMany() {
		return this.items
	}

	async findById(id: string) {
		const category = this.items.find((item) => item.id === id)

		if (!category) {
			return null
		}

		return category
	}

	async create(data: Prisma.CategoryCreateInput) {
		const category = {
			id: data.id ?? randomUUID(),
			name: data.name,
		}

		this.items.push(category)

		return category
	}

	findManyWithTransactions(userId: string): Promise<FindManyMetrics[]> {
		throw new Error('Method not implemented.')
	}
}
