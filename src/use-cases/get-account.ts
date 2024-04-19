import { Account } from '@prisma/client'

import { AccountsRepository } from '@/repositories/accounts-repository'
import { hideAccountNumber } from '@/utils/hide-account-number'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetAccountUseCaseRequest {
	accountId: string
}

interface GetAccountUseCaseResponse {
	account: Account
}

export class GetAccountUseCase {
	constructor(private accountsRepository: AccountsRepository) {}

	async execute({
		accountId,
	}: GetAccountUseCaseRequest): Promise<GetAccountUseCaseResponse> {
		const accountResponse = await this.accountsRepository.findById(accountId)

		if (!accountResponse) {
			throw new ResourceNotFoundError()
		}

		const account = Object.assign(accountResponse, {
			number: accountResponse.number
				? hideAccountNumber(accountResponse.number)
				: null,
		})

		return {
			account: Object.assign(account, {
				balanceInCents: account.balance,
				balance: undefined,
			}),
		}
	}
}
