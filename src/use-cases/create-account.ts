import { AccountsRepository } from '@/repositories/accounts-repository'
import { Account } from '@prisma/client'

interface CreateAccountUseCaseRequest {
	type: string
	bank: string
	number: string | null
	balance: number
	userId: string
}

interface CreateAccountUseCaseResponse {
	account: Account
}

export class CreateAccountUseCase {
	constructor(private accountsRepository: AccountsRepository) {}

	async execute(
		data: CreateAccountUseCaseRequest,
	): Promise<CreateAccountUseCaseResponse> {
		const account = await this.accountsRepository.create({
			...data,
		})

		return {
			account,
		}
	}
}
