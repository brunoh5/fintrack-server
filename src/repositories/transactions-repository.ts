import { Prisma, Transaction } from '@prisma/client'

export interface CreateManyRequest {
	accountId: string
	transactions: {
		userId: string
		categoryId: string
		accountId: string
		amount: number
		shopName: string
		type: string
		payment_method: string
		paid_at: Date | null
		name: string
	}[]
	userId: string
	categoryId: string
}

export interface TransactionsRepository {
	update(id: string, data: Prisma.TransactionUpdateInput): Promise<Transaction>
	createMany(data: CreateManyRequest): Promise<void>
	delete(id: string): Promise<void>
	findManyByAccountId(id: string): Promise<Transaction[]>
	findById(id: string): Promise<Transaction | null>
	create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
}
