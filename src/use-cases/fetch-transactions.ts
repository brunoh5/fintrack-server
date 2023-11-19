import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface FetchTransactionsUseCaseRequest {
	accountId: string
}

interface FetchTransactionsUseCaseResponse {
	transactions: Transaction[]
}

export class FetchTransactionsUseCase {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({
		accountId,
	}: FetchTransactionsUseCaseRequest): Promise<FetchTransactionsUseCaseResponse> {
		const transactions =
			await this.transactionsRepository.findManyByAccountId(accountId)

		return {
			transactions,
		}
	}
}
