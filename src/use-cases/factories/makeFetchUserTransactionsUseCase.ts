import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'

import { FetchUserTransactionsUseCase } from '../fetch-user-transactions'

export function makeFetchUserTransactionUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()
	const useCase = new FetchUserTransactionsUseCase(transactionsRepository)

	return useCase
}
