import { Account } from '@prisma/client'

import { AccountsRepository } from '@/repositories/accounts-repository'

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
		const resumeResponse =
			await this.accountsRepository.findManyByUserId(userId)

		return resumeResponse
	}
}
