import { Transaction } from '@prisma/client'

import { AccountsRepository } from '@/repositories/accounts-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreateManyRequest {
	accountId: string
	transactions: Transaction[]
	userId: string
	categoryId: string
}

export class ImportTransactionsUseCase {
	constructor(
		private transactionsRepository: TransactionsRepository,
		private accountsRepository: AccountsRepository,
	) {}

	async execute({
		accountId,
		transactions,
		userId,
		categoryId,
	}: CreateManyRequest): Promise<void> {
		const doesAccountExists = await this.accountsRepository.findById(accountId)

		if (!doesAccountExists) {
			throw new ResourceNotFoundError()
		}

		await this.transactionsRepository.createMany({
			accountId,
			userId,
			categoryId,
			transactions,
		})

		const totalAmount = transactions.reduce((acc, transaction) => {
			if (transaction_type === 'sent') {
				return acc - transaction.amount
			} else {
				return acc + transaction.amount
			}
		}, 0)

		await this.accountsRepository.updateBalanceAccount({
			id: accountId,
			amount: totalAmount,
			type: 'CREDIT',
		})
	}
}
