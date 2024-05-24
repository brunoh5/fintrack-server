import { AccountsRepository } from '@/repositories/accounts-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

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
			return
		}

		if (transaction?.transaction_type === 'CREDIT') {
			await this.accountsRepository.updateBalanceAccount({
				id: transaction?.accountId,
				amount: transaction?.amount * 100,
				type: 'DEBIT',
			})
		} else {
			await this.accountsRepository.updateBalanceAccount({
				id: transaction?.accountId,
				amount: transaction?.amount * 100,
				type: 'CREDIT',
			})
		}

		await this.transactionsRepository.delete(transactionId)

		return {
			amount: transaction.amount,
			id: transaction.id,
			transaction_type: transaction.transaction_type,
		}
	}
}
