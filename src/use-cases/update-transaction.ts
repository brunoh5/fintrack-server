import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface UpdateTransactionUseCaseRequest {
	transactionId: string
	name: string
	shopName: string
	amount: number
	paid_at: Date | null
	payment_method: string
	type: string
}

interface UpdateTransactionUseCaseResponse {
	transaction: Transaction
}

export class UpdateTransactionUseCase {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({
		transactionId,
		name,
		shopName,
		amount,
		paid_at,
		payment_method,
		type,
	}: UpdateTransactionUseCaseRequest): Promise<UpdateTransactionUseCaseResponse> {
		const transaction = await this.transactionsRepository.update(
			transactionId,
			{
				name,
				shopName,
				amount,
				paid_at,
				payment_method,
				type,
			},
		)

		return {
			transaction,
		}
	}
}
