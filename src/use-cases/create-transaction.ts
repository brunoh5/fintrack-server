import { prisma } from '@/lib/prisma'

interface CreateTransactionUseCaseRequest {
	accountId: string
	categoryId: string
	name: string
	shopName: string
	amount: number
	paid_at: string | null
	type: string
	payment_method: string
	userId: string
}

export class CreateTransactionUseCase {
	async execute({
		accountId,
		categoryId,
		userId,
		name,
		shopName,
		amount,
		paid_at,
		type,
		payment_method,
	}: CreateTransactionUseCaseRequest) {
		const account = await prisma.account.findFirstOrThrow({
			where: { id: accountId },
		})

		const createTransaction = prisma.transaction.create({
			data: {
				accountId,
				categoryId,
				name,
				shopName,
				amount,
				paid_at,
				type,
				method: payment_method,
				userId,
			},
		})

		const updateBalance = prisma.account.update({
			where: { id: accountId },
			data: {
				balance: Number(account.balance) + amount,
			},
		})

		const [transaction] = await prisma.$transaction([
			createTransaction,
			updateBalance,
		])

		return {
			transaction,
		}
	}
}
