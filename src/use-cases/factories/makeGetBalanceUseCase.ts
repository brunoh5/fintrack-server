import { PrismaAccountsRepository } from '@/repositories/prisma/prisma-accounts-repository'
import { GetBalanceUseCase } from '../get-balance'

export function makeGetBalanceUseCase() {
	const accountsRepository = new PrismaAccountsRepository()
	const useCase = new GetBalanceUseCase(accountsRepository)

	return useCase
}
