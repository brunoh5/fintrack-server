import { prisma } from '@/lib/prisma'
import { injectable } from 'tsyringe'

interface StatementsProps {
	accountId: string
	userId: string
	description: string
	amount: number
	type: string
}

@injectable()
class StatementsRepository {
	async create({
		accountId,
		userId,
		description,
		amount,
		type,
	}: StatementsProps) {
		const statement = await prisma.statements.create({
			data: {
				userId,
				accountId,
				description,
				amount,
				type,
			},
		})

		return statement
	}

	async getAccountById(id: string) {
		const accounts = await prisma.accounts.findUnique({
			where: {
				id,
			},
		})

		return accounts
	}

	async getAccountsByUserId(id: string) {
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

export { StatementsRepository }
