import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface FetchUserTransactionsUseCaseRequest {
	userId: string
}

interface FetchUserTransactionsUseCaseResponse {
	transactions: Transaction[]
}

export class FetchUserTransactionsUseCase {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({
		userId,
	}: FetchUserTransactionsUseCaseRequest): Promise<FetchUserTransactionsUseCaseResponse> {
		const transactions =
			await this.transactionsRepository.findManyByUserId(userId)

		return {
			transactions,
		}
	}
}
