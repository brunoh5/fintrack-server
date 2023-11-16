import { prisma } from '@/lib/prisma'
import { Transaction } from '@prisma/client'

interface GetTransactionsByAccountIdUseCaseRequest {
	accountId: string
}

interface GetTransactionsByAccountIdUseCaseResponse {
	transactions: Transaction[]
}

export class GetTransactionsByAccountIdUseCase {
	async execute({
		accountId,
	}: GetTransactionsByAccountIdUseCaseRequest): Promise<GetTransactionsByAccountIdUseCaseResponse> {
		const transactions = await prisma.transaction.findMany({
			where: {
				accountId,
			},
		})

		return {
			transactions,
		}
	}
}
