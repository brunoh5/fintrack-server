import { AccountsRepository } from '@/repositories/accounts-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateTransactionUseCaseRequest {
	accountId: string
	categoryId: string
	name: string
	shopName: string
	amount: number
	userId: string
	transaction_type: 'CREDIT' | 'DEBIT'
	payment_method:
		| 'MONEY'
		| 'PIX'
		| 'CREDIT_CARD'
		| 'DEBIT_CARD'
		| 'BANK_TRANSFER'
}

export class CreateTransactionUseCase {
	constructor(
		private transactionsRepository: TransactionsRepository,
		private accountsRepository: AccountsRepository,
	) {}

	async execute({
		accountId,
		categoryId,
		userId,
		name,
		shopName,
		amount,
		transaction_type,
		payment_method,
	}: CreateTransactionUseCaseRequest) {
		const account = await this.accountsRepository.findById(accountId)

		if (!account) {
			throw new ResourceNotFoundError()
		}

		const transaction = await this.transactionsRepository.create({
			accountId,
			categoryId,
			name,
			shopName,
			amount,
			transaction_type,
			payment_method,
			userId,
		})

		await this.accountsRepository.updateBalanceAccount(
			accountId,
			amount,
			transaction_type,
		)

		return {
			transaction,
		}
	}
}
