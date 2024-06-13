import { randomUUID } from 'node:crypto'

import { Prisma, Transaction } from '@prisma/client'

import {
	MonthExpensesResponse,
	TransactionsRepository,
	UserTransactionResponse,
} from '../transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
	public items: Transaction[] = []

	async update(id: string, data: Prisma.TransactionUpdateInput) {
		const rowIndex = this.items.findIndex((row) => row.id === id)
		const row = this.items[rowIndex]

		this.items[rowIndex] = Object.assign(row, data)

		return row
	}

	async delete(id: string) {
		const rowIndex = this.items.findIndex((row) => row.id === id)

		if (rowIndex <= -1) {
			throw new Error()
		}

		this.items.splice(rowIndex, 1)

		return this.items[rowIndex]
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
			transaction_type: data.transaction_type ?? 'DEBIT',
			amount: data.amount ?? 0,
			payment_method: data.payment_method ?? 'MONEY',
			category: data.category ?? 'OTHERS',
			accountId: data.accountId,
			userId: data.userId,
			date: new Date(),
		}

		this.items.push(transaction)

		return transaction
	}

	async monthlyExpensesMetricsByYear() {
		return [{ month: new Date(), total: 25000 }]
	}

	async findManyByUserId() {
		throw new Error('Method not implemented.')
	}

	async findManyTransactions(): Promise<UserTransactionResponse> {
		throw new Error('Method not implemented.')
	}

	async monthExpenses(): Promise<MonthExpensesResponse[]> {
		throw new Error('Method not implemented.')
	}
}
