import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import {
	CreateMany,
	MonthlyExpense,
	TransactionsRepository,
} from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
	async monthlyExpensesMetricsByYear(year: number, userId: string) {
		const expenses = await prisma.$queryRaw<MonthlyExpense[]>`
			SELECT date_trunc('month', created_at) AS month, SUM(amount) AS total
			FROM transactions
			WHERE EXTRACT(year FROM created_at) = ${year}
			AND type='sent'
			AND "userId" = ${userId}
			GROUP BY month
			ORDER BY month
		`

		return expenses
	}

	async findManyByUserId(id: string) {
		return await prisma.transaction.findMany({
			where: {
				userId: id,
			},
			include: {
				category: true,
			},
		})
	}

	async update(id: string, data: Prisma.TransactionUpdateInput) {
		return prisma.transaction.update({
			where: {
				id,
			},
			data,
		})
	}

	async createMany(data: CreateMany) {
		await prisma.transaction.createMany({
			data: data.transactions,
		})
	}

	async delete(id: string) {
		await prisma.transaction.delete({
			where: {
				id,
			},
		})
	}

	async findManyByAccountId(id: string) {
		return prisma.transaction.findMany({
			where: {
				accountId: id,
			},
			include: {
				category: true,
			},
		})
	}

	async findById(id: string) {
		const transaction = await prisma.transaction.findUnique({
			where: {
				id,
			},
		})

		if (!transaction) {
			return null
		}

		return transaction
	}

	async create(data: Prisma.TransactionUncheckedCreateInput) {
		return prisma.transaction.create({ data })
	}
}
