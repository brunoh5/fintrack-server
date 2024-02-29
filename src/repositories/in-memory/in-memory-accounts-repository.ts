import { randomUUID } from 'node:crypto'

import { Account, Prisma } from '@prisma/client'

import { AccountsRepository } from '../accounts-repository'

export class InMemoryAccountsRepository implements AccountsRepository {
	public items: Account[] = []

	async updateBalanceAccount(
		id: string,
		amount: number,
		type: 'CREDIT' | 'DEBIT',
	) {
		const rowIndex = this.items.findIndex((row) => row.id === id)
		const row = this.items[rowIndex]

		if (type === 'DEBIT') {
			this.items[rowIndex].balance = row.balance - amount
		} else if (type === 'CREDIT') {
			this.items[rowIndex].balance = row.balance + amount
		}
	}

	async getBalanceByAccountId(id: string): Promise<number> {
		const rowIndex = this.items.findIndex((row) => row.id === id)
		const row = this.items[rowIndex]

		return row.balance
	}

	async delete(id: string) {
		const rowIndex = this.items.findIndex((row) => row.id === id)

		if (rowIndex <= -1) {
			throw new Error()
		}

		this.items.splice(rowIndex, 1)
	}

	async findManyByUserId(id: string) {
		return this.items.filter((item) => item.userId === id)
	}

	async findById(id: string) {
		const account = this.items.find((item) => item.id === id)

		if (!account) {
			return null
		}

		return account
	}

	async update(id: string, data: Prisma.AccountUpdateInput): Promise<Account> {
		const rowIndex = this.items.findIndex((row) => row.id === id)
		const row = this.items[rowIndex]

		this.items[rowIndex] = Object.assign(row, data)

		return row
	}

	async create(data: Prisma.AccountUncheckedCreateInput) {
		const account = {
			id: data.id ?? randomUUID(),
			balance: data.balance ?? 0,
			bank: data.bank,
			type: data.type ?? 'CURRENT_ACCOUNT',
			number: data.number ?? null,
			created_at: new Date(),
			userId: data.userId,
		}

		this.items.push(account)

		return account
	}
}
