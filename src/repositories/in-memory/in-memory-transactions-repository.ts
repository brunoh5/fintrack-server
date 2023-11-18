import { Prisma, Transaction } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
	CreateManyRequest,
	TransactionsRepository,
} from '../transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
	public items: Transaction[] = []

	async createMany({
		accountId,
		categoryId,
		userId,
		transactions,
	}: CreateManyRequest): Promise<void> {
		transactions.map((transaction) => {
			const data = {
				id: randomUUID(),
				name: transaction.name,
				shopName: transaction.shopName ?? null,
				created_at: new Date(),
				paid_at: (transaction.paid_at as Date) ?? null,
				type: transaction.type,
				amount: new Prisma.Decimal(Number(transaction.amount)),
				payment_method: transaction.payment_method ?? null,
				categoryId,
				accountId,
				userId,
			}

			return this.items.push(data)
		})
	}

	async delete(id: string) {
		const rowIndex = this.items.findIndex((row) => row.id === id)

		if (rowIndex <= -1) {
			throw new Error()
		}

		this.items.splice(rowIndex, 1)
	}

	async findManyByAccountId(id: string) {
		return this.items.filter((item) => item.accountId === id)
	}

	async findById(id: string) {
		const transactions = this.items.find((item) => item.id === id)

		if (!transactions) {
			return null
		}

		return transactions
	}

	async create(data: Prisma.TransactionUncheckedCreateInput) {
		const transaction = {
			id: data.id ?? randomUUID(),
			name: data.name,
			shopName: data.shopName ?? null,
			created_at: new Date(),
			paid_at: (data.paid_at as Date) ?? null,
			type: data.type,
			amount: new Prisma.Decimal(Number(data.amount)),
			payment_method: data.payment_method ?? null,
			categoryId: data.categoryId,
			accountId: data.accountId,
			userId: data.userId,
		}

		this.items.push(transaction)

		return transaction
	}
}
