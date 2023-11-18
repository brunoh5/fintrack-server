import { AccountsRepository } from '@/repositories/accounts-repository'
import {
	CreateManyRequest,
	TransactionsRepository,
} from '@/repositories/transactions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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
			return acc + transaction.amount
		}, 0)

		await this.accountsRepository.updateBalanceAccount(accountId, totalAmount)
	}
}
