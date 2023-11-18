import { AccountsRepository } from '@/repositories/accounts-repository'
import { Account } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateAccountUseCaseRequest {
	accountId: string
	type: string | undefined
	bank: string | undefined
	number: string | undefined
}

interface UpdateAccountUseCaseResponse {
	account: Account
}

export class UpdateAccountUseCase {
	constructor(private accountsRepository: AccountsRepository) {}

	async execute({
		accountId,
		type,
		bank,
		number,
	}: UpdateAccountUseCaseRequest): Promise<UpdateAccountUseCaseResponse> {
		const account = await this.accountsRepository.update(accountId, {
			type,
			bank,
			number,
		})

		if (!account) {
			throw new ResourceNotFoundError()
		}

		return {
			account,
		}
	}
}
