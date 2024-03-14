import { Transaction, TransactionType } from '@prisma/client'

import { TransactionsRepository } from '@/repositories/transactions-repository'

interface FetchUserTransactionsUseCaseRequest {
	userId: string
	transaction_type?: TransactionType
	page: number
	limit?: number
}

interface FetchUserTransactionsUseCaseResponse {
	transactions: Transaction[]
}

export class FetchUserTransactionsUseCase {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({
		userId,
		transaction_type,
		page,
		limit,
	}: FetchUserTransactionsUseCaseRequest): Promise<FetchUserTransactionsUseCaseResponse> {
		const transactions = await this.transactionsRepository.findManyByUserId({
			id: userId,
			transaction_type,
			page,
			limit,
		})

		const formattedTransactions = transactions.map((transaction) => {
			return {
				...transaction,
				amount: transaction.amount / 100,
			}
		})

		return {
			transactions: formattedTransactions,
		}
	}
}
