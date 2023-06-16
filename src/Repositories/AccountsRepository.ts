import { prisma } from '@/lib/prisma'
import { injectable } from 'tsyringe'

interface AccountsProps {
	userId: string
	name: string
	description?: string
	balance?: number
	type: string
	bank?: string
}

@injectable()
class AccountsRepository {
	async create({
		userId,
		name,
		description,
		balance,
		type,
		bank,
	}: AccountsProps) {
		const account = await prisma.accounts.create({
			data: {
				userId,
				name,
				description,
				balance,
				type,
				bank,
			},
		})

		return account
	}

	async findById(id: string) {
		const accounts = await prisma.accounts.findUnique({
			where: {
				id,
			},
		})

		return accounts
	}

	async findByUserId(id: string) {
		const accounts = await prisma.accounts.findMany({
			where: {
				userId: id,
			},
		})

		return accounts
	}

	async getBalanceById(id: string) {
		const balance = await prisma.accounts.findUnique({
			where: { id },
			select: { balance: true },
		})

		return Number(balance)
	}
}

export { AccountsRepository }
