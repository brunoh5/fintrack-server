import {
	Category,
	PaymentMethod,
	Prisma,
	Transaction,
	TransactionType,
} from '@prisma/client'

export interface MonthlyExpense {
	month: Date
	total: number
}

export interface FindManyTransactionsProps {
	userId?: string
	pageIndex: number
	from?: string
	to?: string
	name?: string
	transaction_type?: TransactionType
	accountId?: string
	payment_method?: PaymentMethod
	category?: Category
}

export interface UserTransactionResponse {
	transactions: Transaction[]
	transactionsCount: number
	transactionsStatus: {
		totalRevenueInCents: number
		totalExpenseInCents: number
	}
}

export interface MonthExpensesResponse {
	category: string
	transactions: Transaction[]
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
	delete(id: string): Promise<Transaction>
	findManyTransactions(
		data: FindManyTransactionsProps,
	): Promise<UserTransactionResponse>
	findById(id: string): Promise<Transaction | null>
	create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
	monthExpenses(userId: string): Promise<MonthExpensesResponse[]>
}
