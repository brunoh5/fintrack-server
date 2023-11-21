import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
	findById(id: string): Promise<Category | null>
	findMany(): Promise<Category[]>
	create(data: Prisma.CategoryCreateInput): Promise<Category>
}
