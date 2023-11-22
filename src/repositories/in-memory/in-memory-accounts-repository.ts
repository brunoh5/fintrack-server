import { Account, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { AccountsRepository } from '../accounts-repository'

export class InMemoryAccountsRepository implements AccountsRepository {
	public items: Account[] = []

	async updateBalanceAccount(
		id: string,
		amount: number,
		type: 'sent' | 'received',
	) {
		const rowIndex = this.items.findIndex((row) => row.id === id)
		const row = this.items[rowIndex]

		if (type === 'sent') {
			this.items[rowIndex].balance = new Prisma.Decimal(
				row.balance.toNumber() - amount,
			)
		} else if (type === 'received') {
			this.items[rowIndex].balance = new Prisma.Decimal(
				row.balance.toNumber() + amount,
			)
		}
	}

	async getBalanceByAccountId(id: string): Promise<number> {
		const rowIndex = this.items.findIndex((row) => row.id === id)
		const row = this.items[rowIndex]

		return row.balance.toNumber()
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
			balance: new Prisma.Decimal(Number(data.balance)),
			bank: data.bank,
			type: data.type,
			number: data.number ?? null,
			created_at: new Date(),
			userId: data.userId,
		}

		this.items.push(account)

		return account
	}
}
