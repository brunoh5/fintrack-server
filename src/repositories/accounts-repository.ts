import { Account, Prisma } from '@prisma/client'

interface FindManyByUserIdResponse {
	accounts: Account[]
	total: number
	accountsCount: number
}

export interface UpdateBalanceAccountRequest {
	id: string
	amount: number
	type: 'DEBIT' | 'CREDIT'
}

export interface AccountsRepository {
	updateBalanceAccount(data: UpdateBalanceAccountRequest): Promise<void>
	delete(id: string): Promise<void>
	update(id: string, data: Prisma.AccountUpdateInput): Promise<Account>
	findManyByUserId(id: string): Promise<FindManyByUserIdResponse>
	findById(id: string): Promise<Account | null>
	create(data: Prisma.AccountUncheckedCreateInput): Promise<Account>
}
