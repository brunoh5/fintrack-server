import { AccountsRepository } from '@/repositories/accounts-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteAccountUseCaseRequest {
	accountId: string
}

export class DeleteAccountUseCase {
	constructor(private accountsRepository: AccountsRepository) {}

	async execute({ accountId }: DeleteAccountUseCaseRequest): Promise<void> {
		const doesAccountExist = this.accountsRepository.findById(accountId)

		if (!doesAccountExist) {
			throw new ResourceNotFoundError()
		}

		await this.accountsRepository.delete(accountId)
	}
}
