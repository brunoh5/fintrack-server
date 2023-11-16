import { prisma } from '@/lib/prisma'

interface ListTransactionByIdUseCaseRequest {
	id: string
	userId: string
}

export class ListTransactionByIdUseCase {
	async execute({ id, userId }: ListTransactionByIdUseCaseRequest) {
		const transactions = await prisma.transaction.findMany({
			where: {
				id,
				userId,
			},

			include: {
				category: true,
			},
		})

		return { transactions }
	}
}
