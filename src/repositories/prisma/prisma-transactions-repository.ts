import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'

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
		const today = dayjs()
		const lastYear = today.subtract(1, 'year')

		const lastYearWithMonth = lastYear.format('YYYY-MM')
		const currentYearWithMonth = today.format('YYYY-MM')

		const expenses = await prisma.$queryRaw<MonthlyExpense[]>`
			SELECT date_trunc('month', created_at) AS month, SUM(CAST(amount / 100 AS BIGINT)) AS total
			FROM transactions
			WHERE TO_CHAR(created_at, 'YYYY-MM')
			BETWEEN ${lastYearWithMonth} AND ${currentYearWithMonth}
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

	async expensesCompareWithLastMonth(userId: string) {
		const today = dayjs()
		const lastMonth = today.subtract(1, 'month')

		const lastMonthWithYear = lastMonth.format('YYYY-MM')
		const currentMonthWithYear = today.format('YYYY-MM')

		const metrics = await prisma.$queryRaw`
			WITH transactions AS (
				SELECT EXTRACT(MONTH FROM created_at) as month,
					SUM(CAST(amount AS BIGINT)) AS total,
					category
					FROM transactions
					WHERE TO_CHAR(created_at, 'YYYY-MM')
					BETWEEN ${lastMonthWithYear} AND ${currentMonthWithYear}
					AND "userId" = ${userId}
					AND transaction_type = 'DEBIT'
					GROUP BY month, category
					ORDER BY month DESC
			)
			SELECT category, JSON_AGG(transactions.*) as transactions
			FROM transactions
			GROUP BY transactions.category
			ORDER BY category ASC
		`

		return metrics
	}

	async create(data: Prisma.TransactionUncheckedCreateInput) {
		return prisma.transaction.create({ data })
	}
}
