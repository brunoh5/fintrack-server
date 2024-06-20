import { $Enums, Transaction } from '@prisma/client'

import { TransactionsRepository } from '@/repositories/transactions-repository'

interface UpdateTransactionUseCaseRequest {
	id: string
	name: string
	shopName?: string | null | undefined
	category: $Enums.Category
	payment_method: $Enums.PaymentMethod
	amount: number
	date?: Date | undefined
}

interface UpdateTransactionUseCaseResponse {
	transaction: Transaction
}

export class UpdateTransactionUseCase {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({
		id,
		category,
		name,
		shopName,
		amount,
		payment_method,
		date,
	}: UpdateTransactionUseCaseRequest): Promise<UpdateTransactionUseCaseResponse> {
		const transaction = await this.transactionsRepository.update(id, {
			name,
			shopName,
			amount,
			payment_method,
			category,
			date,
		})

		return {
			transaction,
		}
	}
}
