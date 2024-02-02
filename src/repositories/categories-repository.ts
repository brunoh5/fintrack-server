import { Category, Prisma } from '@prisma/client'

import { FindManyMetrics } from './prisma/prisma-categories-repository'

export interface CategoriesRepository {
	findById(id: string): Promise<Category | null>
	findMany(): Promise<Category[]>
	create(data: Prisma.CategoryCreateInput): Promise<Category>
	findManyWithTransactions(userId: string): Promise<FindManyMetrics[]>
}
