import { Prisma, Transaction } from '@prisma/client'

export interface CreateMany {
	transactions: Prisma.TransactionCreateManyInput[]
}

export interface MonthlyExpense {
	month: Date
	total_amount: string
}

export interface TransactionsRepository {
	monthlyExpensesMetricsByYear(
		year: number,
		userId: string,
	): Promise<MonthlyExpense[]>
	update(id: string, data: Prisma.TransactionUpdateInput): Promise<Transaction>
	createMany(data: CreateMany): Promise<void>
	delete(id: string): Promise<void>
	findManyByUserId({
		id,
		type,
	}: {
		id: string
		type: string | null
	}): Promise<Transaction[]>
	findManyByAccountId(id: string): Promise<Transaction[]>
	findById(id: string): Promise<Transaction | null>
	create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
}
