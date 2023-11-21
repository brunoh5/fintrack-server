import { PrismaAccountsRepository } from "@/repositories/prisma/prisma-accounts-repository";
import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { ImportTransactionsUseCase } from "../import-transactions";

export function makeImportTransactionsUseCase() {
	const transactionsRepository = new PrismaTransactionsRepository()
	const accountsRepository = new PrismaAccountsRepository()
	const useCase = new ImportTransactionsUseCase(transactionsRepository, accountsRepository)

	return useCase
}
