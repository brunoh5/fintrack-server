import { Prisma, Transaction, TransactionType } from '@prisma/client'

export interface CreateMany {
	transactions: Prisma.TransactionCreateManyInput[]
}

export interface MonthlyExpense {
	month: Date
	total_amount: string
}

export interface FindManyByUserIdProps {
	id: string
	transaction_type?: TransactionType
	page: number
	limit?: number
}

export interface TransactionMetrics {
	category: string
	transactions: {
		month: number
		total: number
		category: string
	}[]
}

export interface TransactionsRepository {
	monthlyExpensesMetricsByYear(
		year: number,
		userId: string,
	): Promise<MonthlyExpense[]>
	update(
		id: string,
		data: Prisma.TransactionUncheckedUpdateInput,
	): Promise<Transaction>
	createMany(data: CreateMany): Promise<void>
	delete(id: string): Promise<void>
	findManyByUserId({
		id,
		transaction_type,
	}: FindManyByUserIdProps): Promise<Transaction[]>
	findManyByAccountId(
		id: string,
		page: number,
		limit?: number,
	): Promise<Transaction[]>
	findById(id: string): Promise<Transaction | null>
	create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
	expensesCompareWithLastMonth(
		userId: string,
	): Promise<TransactionMetrics[] | null>
}
