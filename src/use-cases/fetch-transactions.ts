import {
	Category,
	PaymentMethod,
	Transaction,
	TransactionType,
} from '@prisma/client'

import { TransactionsRepository } from '@/repositories/transactions-repository'

interface FetchTransactionsUseCaseRequest {
	userId: string
	transaction_type?: TransactionType
	pageIndex?: number
	accountId?: string
	name?: string
	category?: Category
	payment_method?: PaymentMethod
}

interface FetchTransactionsUseCaseResponse {
	transactions: Transaction[]
	meta: {
		totalCount: number
		pageIndex: number
		perPage: number
	}
}

export class FetchTransactionsUseCase {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({
		userId,
		name,
		category,
		payment_method,
		transaction_type,
		pageIndex = 0,
		accountId,
	}: FetchTransactionsUseCaseRequest): Promise<FetchTransactionsUseCaseResponse> {
		const result = await this.transactionsRepository.findManyByUserId({
			id: userId,
			name,
			transaction_type,
			pageIndex,
			accountId,
			category,
			payment_method,
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
