import { Prisma, Transaction } from '@prisma/client'

export interface CreateMany {
	transactions: Prisma.TransactionCreateManyInput[]
}

export interface TransactionsRepository {
	update(id: string, data: Prisma.TransactionUpdateInput): Promise<Transaction>
	createMany(data: CreateMany): Promise<void>
	delete(id: string): Promise<void>
	findManyByAccountId(id: string): Promise<Transaction[]>
	findById(id: string): Promise<Transaction | null>
	create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
}
