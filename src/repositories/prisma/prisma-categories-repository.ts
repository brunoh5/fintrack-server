import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'

export class PrismaCategoriesRepository implements CategoriesRepository {
	async findById(id: string) {
		return prisma.category.findUnique({
			where: {
				id,
			},
		})
	}

	async findMany() {
		return prisma.category.findMany()
	}

	async create(data: Prisma.CategoryCreateInput) {
		return prisma.category.create({
			data,
		})
	}
}
