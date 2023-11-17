import { AccountsRepository } from '@/repositories/accounts-repository'
import { hideAccountNumber } from '@/utils/hide-account-number'
import { Account } from '@prisma/client'

interface FetchAccountsUseCaseRequest {
	userId: string
}

interface FetchAccountsUseCaseResponse {
	accounts: Account[]
}

export class FetchAccountsUseCase {
	constructor(private accountsRepository: AccountsRepository) {}

	async execute({
		userId,
	}: FetchAccountsUseCaseRequest): Promise<FetchAccountsUseCaseResponse> {
		const accountsResponse =
			await this.accountsRepository.findManyByUserId(userId)

		const accounts = accountsResponse.map((account) => {
			const { number } = account

			return Object.assign(account, {
				number: number ? hideAccountNumber(number) : null,
			})
		})

		return { accounts }
	}
}
