import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { divideAmount } from '@/utils/divide-amount'

import {
	CreateMany,
	FindManyByUserIdProps,
	MonthlyExpense,
	TransactionsRepository,
} from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
	async monthlyExpensesMetricsByYear(year: number, userId: string) {
		const expenses = await prisma.$queryRaw<MonthlyExpense[]>`
			SELECT date_trunc('month', created_at) AS month, SUM(amount) AS total
			FROM transactions
			WHERE EXTRACT(year FROM created_at) = ${year}
			AND transaction_type='DEBIT'
			AND "userId" = ${userId}
			GROUP BY month
			ORDER BY month
		`

		return expenses
	}

	async findManyByUserId({
		id,
		transaction_type,
		page,
		limit = 10,
	}: FindManyByUserIdProps) {
		return await prisma.transaction.findMany({
			where: {
				userId: id,
				transaction_type,
			},
			include: {
				category: true,
			},
			take: limit,
			skip: (page - 1) * limit,
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

	async findManyByAccountId(id: string, page = 1, limit = 10) {
		const transactions = await prisma.transaction.findMany({
			where: {
				accountId: id,
			},
			include: {
				category: true,
			},
			take: limit,
			skip: (page - 1) * limit,
		})

		const transactionsAmountFormatted = transactions.map((transaction) => {
			return Object.assign(transaction, {
				amount: divideAmount(transaction.amount),
			})
		})

		return transactionsAmountFormatted
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

		const transactionAmountFormatted = Object.assign(transaction, {
			amount: divideAmount(transaction.amount),
		})

		return transactionAmountFormatted
	}

	async create(data: Prisma.TransactionUncheckedCreateInput) {
		return prisma.transaction.create({ data })
	}
}
