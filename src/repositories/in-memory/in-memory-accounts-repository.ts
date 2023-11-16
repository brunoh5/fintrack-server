import { Account, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { AccountsRepository } from '../accounts-repository'

export class InMemoryAccountsRepository implements AccountsRepository {
	public items: Account[] = []

	async findById(id: string) {
		const account = this.items.find((item) => item.id === id)

		if (!account) {
			return null
		}

		return account
	}

	async create(data: Prisma.AccountUncheckedCreateInput) {
		const account = {
			id: randomUUID(),
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
