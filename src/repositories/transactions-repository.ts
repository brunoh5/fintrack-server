import { Prisma, Transaction, TransactionType } from '@prisma/client'

export interface CreateMany {
	transactions: Prisma.TransactionCreateManyInput[]
}

export interface MonthlyExpense {
	month: Date
	total: number
}

export interface FindManyByUserIdProps {
	id: string
	transaction_type?: TransactionType | undefined
	pageIndex?: number
}

export interface TransactionMetrics {
	category: string
	transactions: {
		month: number
		total: number
		category: string
	}[]
}

export interface UserTransactionResponse {
	transactions: Transaction[]
	transactionsCount: number
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
		pageIndex,
	}: FindManyByUserIdProps): Promise<UserTransactionResponse>
	findManyByAccountId(id: string, pageIndex: number): Promise<Transaction[]>
	findById(id: string): Promise<Transaction | null>
	create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
	expensesCompareWithLastMonth(
		userId: string,
	): Promise<TransactionMetrics[] | null>
}
