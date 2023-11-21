import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { FetchTransactionsUseCase } from '../fetch-transactions'

export function makeFetchTransactionUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()
	const useCase = new FetchTransactionsUseCase(transactionsRepository)

	return useCase
}
