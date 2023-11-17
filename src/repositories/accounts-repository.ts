import { Account, Prisma } from '@prisma/client'

export interface AccountsRepository {
	findManyByUserId(id: string): Promise<Account[]>
	findById(id: string): Promise<Account | null>
	create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>
}
