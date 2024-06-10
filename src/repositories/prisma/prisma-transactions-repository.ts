import { Prisma } from '@prisma/client'
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns'
import dayjs from 'dayjs'

import { prisma } from '@/lib/prisma'

import {
	CreateMany,
	FindManyTransactionsProps,
	MonthExpensesResponse,
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

		const formattedExpenses = expenses.map((expense) => {
			return Object.assign(expense, {
				month: dayjs(expense.month).format('MMM/YYYY'),
				total: Number(expense.total * -1),
			})
		})

		return formattedExpenses
	}

	async findManyTransactions({
		userId,
		accountId,
		name,
		transaction_type,
		payment_method,
		category,
		pageIndex,
		from,
		to,
	}: FindManyTransactionsProps) {
		const startDate = from
			? startOfDay(new Date(from))
			: startOfMonth(new Date())
		const endDate = to
			? endOfDay(new Date(to))
			: from
				? endOfMonth(new Date(from))
				: new Date()

		const transactionsResult = await prisma.transaction.findMany({
			where: {
				name: {
					contains: name,
					mode: 'insensitive',
				},
				userId,
				accountId,
				transaction_type,
				payment_method,
				category,
				created_at: {
					gte: startDate.toISOString(),
					lte: endDate.toISOString(),
				},
			},
			take: 10,
			skip: pageIndex * 10,
			orderBy: {
				created_at: 'desc',
			},
		})

		const transactionsCount = await prisma.transaction.count({
			where: {
				name: {
					contains: name,
					mode: 'insensitive',
				},
				userId,
				accountId,
				transaction_type,
				payment_method,
				category,
				created_at: {
					gte: startDate.toISOString(),
					lte: endDate.toISOString(),
				},
			},
		})

		const { _sum: revenueSum } = await prisma.transaction.aggregate({
			_sum: {
				amount: true,
			},
			where: {
				name: {
					contains: name,
					mode: 'insensitive',
				},
				userId,
				accountId,
				transaction_type: 'CREDIT',
				payment_method,
				category,
				created_at: {
					gte: startDate.toISOString(),
					lte: endDate.toISOString(),
				},
			},
		})

		const { _sum: expenseSum } = await prisma.transaction.aggregate({
			_sum: {
				amount: true,
			},
			where: {
				name: {
					contains: name,
					mode: 'insensitive',
				},
				userId,
				accountId,
				transaction_type: 'DEBIT',
				payment_method,
				category,
				created_at: {
					gte: startDate.toISOString(),
					lte: endDate.toISOString(),
				},
			},
		})

		const transactionsStatus = {
			totalRevenueInCents: revenueSum.amount ?? 0,
			totalExpenseInCents: expenseSum.amount ?? 0,
		}

		const transactions = transactionsResult.map((transaction) => {
			return Object.assign(transaction, {
				amount: undefined,
				amountInCents: transaction.amount,
				userId: undefined,
			})
		})

		return { transactions, transactionsCount, transactionsStatus }
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
		return await prisma.transaction.delete({
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
				amount: undefined,
				amountInCents: transaction.amount,
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

		return Object.assign(transaction, {
			amount: undefined,
			amountInCents: transaction.amount,
			userId: undefined,
		})
	}

	async monthExpenses(userId: string) {
		const today = dayjs()
		const lastMonth = today.subtract(1, 'month')

		const lastMonthWithYear = lastMonth.format('YYYY-MM')
		const currentMonthWithYear = today.format('YYYY-MM')

		const expenses = await prisma.$queryRaw<MonthExpensesResponse[]>`
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

		return expenses
	}

	async create(data: Prisma.TransactionUncheckedCreateInput) {
		return prisma.transaction.create({ data })
	}
}
