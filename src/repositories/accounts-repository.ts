import { Account, Prisma } from '@prisma/client'

export interface AccountsRepository {
	getBalanceByAccountId(id: string): Promise<number>
	delete(id: string): Promise<void>
	// update(id: string, data: Prisma.AccountUpdateInput): Promise<Account>
	findManyByUserId(id: string): Promise<Account[]>
	findById(id: string): Promise<Account | null>
	create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>
}
