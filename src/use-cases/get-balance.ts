import { AccountsRepository } from '@/repositories/accounts-repository'

interface GetBalanceUseCaseRequest {
	accountId: string
}

interface GetBalanceUseCaseResponse {
	balance: number
}

export class GetBalanceUseCase {
	constructor(private accountsRepository: AccountsRepository) {}

	async execute({
		accountId,
	}: GetBalanceUseCaseRequest): Promise<GetBalanceUseCaseResponse> {
		const balance =
			await this.accountsRepository.getBalanceByAccountId(accountId)

		return { balance }
	}
}
