import { $Enums } from '@prisma/client'

import { AccountsRepository } from '@/repositories/accounts-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreateTransactionUseCaseRequest {
	accountId: string
	name: string
	shopName?: string
	amount: number
	userId: string
	date: Date | undefined
	transaction_type: $Enums.TransactionType
	category: $Enums.Category
	payment_method: $Enums.PaymentMethod
}

export class CreateTransactionUseCase {
	constructor(
		private transactionsRepository: TransactionsRepository,
		private accountsRepository: AccountsRepository,
	) {}

	async execute({
		accountId,
		category,
		userId,
		name,
		shopName,
		amount,
		payment_method,
		date,
		transaction_type,
	}: CreateTransactionUseCaseRequest) {
		const account = await this.accountsRepository.findById(accountId)

		if (!account) {
			throw new ResourceNotFoundError()
		}

		const transaction = await this.transactionsRepository.create({
			accountId,
			category,
			name,
			shopName,
			amount,
			payment_method,
			userId,
			transaction_type,
			date,
		})

		await this.accountsRepository.updateBalanceAccount({
			id: accountId,
			amount,
			type: transaction_type,
		})

		return {
			transaction,
		}
	}
}
