import { Transaction } from '@prisma/client'

import { TransactionsRepository } from '@/repositories/transactions-repository'

interface UpdateTransactionUseCaseRequest {
	transactionId: string
	categoryId: string
	name: string
	shopName: string
	amount: number
	transaction_type: 'CREDIT' | 'DEBIT'
	payment_method:
		| 'MONEY'
		| 'PIX'
		| 'CREDIT_CARD'
		| 'DEBIT_CARD'
		| 'BANK_TRANSFER'
}

interface UpdateTransactionUseCaseResponse {
	transaction: Transaction
}

export class UpdateTransactionUseCase {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({
		transactionId,
		categoryId,
		name,
		shopName,
		amount,
		payment_method,
		transaction_type,
	}: UpdateTransactionUseCaseRequest): Promise<UpdateTransactionUseCaseResponse> {
		const transaction = await this.transactionsRepository.update(
			transactionId,
			{
				name,
				shopName,
				amount,
				payment_method,
				categoryId,
				transaction_type,
			},
		)

		return {
			transaction,
		}
	}
}
