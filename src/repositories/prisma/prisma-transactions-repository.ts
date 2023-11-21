import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CreateMany, TransactionsRepository } from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
	async update(id: string, data: Prisma.TransactionUpdateInput) {
		return prisma.transaction.update({
			where: {
				id,
			},
			data,
		})
	}

	async createMany(data: CreateMany) {
		await prisma.transaction.createMany({
			data: data.transactions,
		})
	}

	async delete(id: string) {
		await prisma.transaction.delete({
			where: {
				id,
			},
		})
	}

	async findManyByAccountId(id: string) {
		return prisma.transaction.findMany({
			where: {
				accountId: id,
			},
			include: {
				category: true,
			},
		})
	}

	async findById(id: string) {
		const transaction = await prisma.transaction.findUnique({
			where: {
				id,
			},
		})

		if (!transaction) {
			return null
		}

		return transaction
	}

	async create(data: Prisma.TransactionUncheckedCreateInput) {
		return prisma.transaction.create({ data })
	}
}
