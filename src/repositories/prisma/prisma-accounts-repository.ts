import { Account, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { AccountsRepository } from '../accounts-repository'

interface PrismaFindManyByUserIdResponse {
	accounts: Account[]
	total: number
}

export class PrismaAccountsRepository implements AccountsRepository {
	async updateBalanceAccount(
		id: string,
		amount: number,
		type: 'DEBIT' | 'CREDIT',
	) {
		const account = (await this.findById(id)) as Account

		if (type === 'CREDIT') {
			account.balance = Number(account.balance) + amount
		}

		if (type === 'DEBIT') {
			account.balance = Number(account.balance) - amount
		}

		await this.update(id, account)
	}

	async getBalanceByAccountId(id: string) {
		const account = await prisma.account.findUnique({
			where: {
				id,
			},
			select: {
				balance: true,
			},
		})

		return Number(account?.balance)
	}

	async delete(id: string) {
		await prisma.account.delete({ where: { id } })
	}

	async update(id: string, data: Prisma.AccountUpdateInput) {
		return prisma.account.update({
			where: {
				id,
			},
			data,
		})
	}

	async findManyByUserId(id: string) {
		const accounts = await prisma.$queryRaw<PrismaFindManyByUserIdResponse[]>`
			SELECT JSON_AGG(accounts.*) as accounts,
			SUM(CAST(balance / 100 AS BIGINT)) AS total
			FROM accounts
			WHERE "userId" = ${id}
		`

		const account = accounts[0]

		return account
	}

	async findById(id: string) {
		return prisma.account.findUnique({
			where: {
				id,
			},
		})
	}

	async create(data: Prisma.AccountUncheckedCreateInput) {
		const account = await prisma.account.create({
			data,
		})

		return account
	}
}
