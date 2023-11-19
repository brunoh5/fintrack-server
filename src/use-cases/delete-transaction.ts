import { AccountsRepository } from '@/repositories/accounts-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

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
	}: DeleteTransactionUseCaseRequest): Promise<void> {
		const transaction = (await this.transactionsRepository.findById(
			transactionId,
		)) as Transaction

		// console.log(
		// 	await this.accountsRepository.getBalanceByAccountId(
		// 		transaction.accountId,
		// 	),
		// )

		await this.accountsRepository.updateBalanceAccount(
			transaction?.accountId,
			Number(transaction?.amount),
			'sent',
		)

		return this.transactionsRepository.delete(transactionId)
	}
}
