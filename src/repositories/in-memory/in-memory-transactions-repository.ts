import { Prisma, Transaction } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CreateMany, TransactionsRepository } from '../transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
	public items: Transaction[] = []

	async update(id: string, data: Prisma.TransactionUpdateInput) {
		const rowIndex = this.items.findIndex((row) => row.id === id)
		const row = this.items[rowIndex]

		this.items[rowIndex] = Object.assign(row, data)

		return row
	}

	async createMany({ transactions }: CreateMany): Promise<void> {
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
				categoryId: transaction.categoryId,
				accountId: transaction.accountId,
				userId: transaction.userId,
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
