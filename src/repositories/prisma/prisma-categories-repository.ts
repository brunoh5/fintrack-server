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
		const today = dayjs()
		const lastMonth = today.subtract(1, 'month')

		const lastMonthWithYear = lastMonth.format('YYYY-MM')
		const currentMonthWithYear = today.format('YYYY-MM')

		const metrics = await prisma.$queryRaw<FindManyMetrics[]>`
			WITH transactions AS (
				SELECT EXTRACT(MONTH FROM created_at) as month,
				SUM(amount) AS total,
				"categoryId"
				FROM transactions AS t
				WHERE TO_CHAR(created_at, 'YYYY-MM') BETWEEN ${lastMonthWithYear} AND ${currentMonthWithYear}
				AND t."userId" = ${userId}
				AND t.type = 'sent'
				GROUP BY  month, "categoryId"
				ORDER BY month ASC
			)
			SELECT c.id, c.name, JSON_AGG (transactions.*) AS transactions
			FROM categories AS c
			LEFT JOIN transactions ON c.id = transactions."categoryId"
			GROUP BY c.id
			ORDER BY c.name
		`

		return metrics
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
