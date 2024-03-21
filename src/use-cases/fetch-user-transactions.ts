import { Transaction, TransactionType } from '@prisma/client'

import { TransactionsRepository } from '@/repositories/transactions-repository'

interface FetchUserTransactionsUseCaseRequest {
	userId: string
	transaction_type?: TransactionType
	pageIndex?: number
}

interface FetchUserTransactionsUseCaseResponse {
	transactions: Transaction[]
	meta: {
		totalCount: number
		pageIndex: number
		perPage: number
	}
}

export class FetchUserTransactionsUseCase {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({
		userId,
		transaction_type,
		pageIndex = 0,
	}: FetchUserTransactionsUseCaseRequest): Promise<FetchUserTransactionsUseCaseResponse> {
		const result = await this.transactionsRepository.findManyByUserId({
			id: userId,
			transaction_type,
			pageIndex,
		})

		return {
			transactions: result.transactions,
			meta: {
				totalCount: result.transactionsCount,
				pageIndex,
				perPage: 10,
			},
		}
	}
}
