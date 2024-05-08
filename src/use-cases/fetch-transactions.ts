import {
	Category,
	PaymentMethod,
	Transaction,
	TransactionType,
} from '@prisma/client'

import { TransactionsRepository } from '@/repositories/transactions-repository'

interface FetchTransactionsUseCaseRequest {
	userId: string
	from?: string
	to?: string
	transaction_type?: TransactionType
	pageIndex?: number
	accountId?: string
	name?: string
	category?: Category
	payment_method?: PaymentMethod
}

interface FetchTransactionsUseCaseResponse {
	transactions: Transaction[]
	transactionsStatus: {
		totalRevenueInCents: number
		totalExpenseInCents: number
	}
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
		from,
		to,
	}: FetchTransactionsUseCaseRequest): Promise<FetchTransactionsUseCaseResponse> {
		const { transactions, transactionsCount, transactionsStatus } =
			await this.transactionsRepository.findManyTransactions({
				userId,
				name,
				transaction_type,
				pageIndex,
				accountId,
				category,
				payment_method,
				from,
				to,
			})

		return {
			transactions,
			transactionsStatus,
			meta: {
				totalCount: transactionsCount,
				pageIndex,
				perPage: 10,
			},
		}
	}
}
