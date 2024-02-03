import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { prisma } from '@/lib/prisma'

import { CategoriesRepository } from '../categories-repository'

export type FindManyMetrics = {
	id: string
	name: string
	transactions: {
		month: number
		categoryId: string
		quant: number
		total: number
	}[]
}

export class PrismaCategoriesRepository implements CategoriesRepository {
	async findManyWithTransactions(userId: string) {
		return await prisma.$queryRaw<FindManyMetrics[]>`
		WITH transactions AS (
			SELECT EXTRACT(MONTH FROM created_at) as month,
			"categoryId",
			COUNT(id) AS quant,
			SUM(amount) AS total
			FROM transactions AS t
			WHERE t."userId" = ${userId},
			AND EXTRACT(year FROM created_at) = ${dayjs().year()}
			GROUP BY  "categoryId", t."created_at"
			ORDER BY month
		)
		SELECT c.id, c.name, JSON_AGG (transactions.*) AS transactions
		FROM categories AS c
		LEFT JOIN transactions ON c.id = transactions."categoryId"
		GROUP BY c.id
		ORDER BY c.name
	`
	}

	async findById(id: string) {
		return await prisma.category.findUnique({
			where: {
				id,
			},
		})
	}

	async findMany() {
		const categories = await prisma.category.findMany()

		return categories
	}

	async create(data: Prisma.CategoryCreateInput) {
		return await prisma.category.create({
			data,
		})
	}
}
