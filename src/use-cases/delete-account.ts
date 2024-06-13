import { AccountsRepository } from '@/repositories/accounts-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteAccountUseCaseRequest {
	accountId: string
}

export class DeleteAccountUseCase {
	constructor(
		private accountsRepository: AccountsRepository,
		private transactionsRepository: TransactionsRepository,
	) {}

	async execute({ accountId }: DeleteAccountUseCaseRequest): Promise<void> {
		const account = await this.accountsRepository.findById(accountId)

		if (!account) {
			throw new ResourceNotFoundError()
		}

		await this.accountsRepository.delete(accountId)
	}
}
