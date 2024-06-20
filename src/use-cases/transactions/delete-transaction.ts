import { AccountsRepository } from '@/repositories/accounts-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteTransactionUseCaseRequest {
	transactionId: string
}

export class DeleteTransactionUseCase {
	constructor(
		private transactionsRepository: TransactionsRepository,
		private accountsRepository: AccountsRepository,
	) {}

	async execute({
		transactionId,
	}: DeleteTransactionUseCaseRequest): Promise<any> {
		const transaction =
			await this.transactionsRepository.findById(transactionId)

		if (!transaction) {
			throw new ResourceNotFoundError()
		}

		await this.accountsRepository.updateBalanceAccount(
			transaction.accountId,
			transaction.amount * -1,
		)

		await this.transactionsRepository.delete(transactionId)

		return {
			transaction,
		}
	}
}
