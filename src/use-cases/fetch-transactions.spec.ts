import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

import { FetchTransactionsUseCase } from './fetch-transactions'

let transactionsRepository: TransactionsRepository
let accountsRepository: AccountsRepository
let sut: FetchTransactionsUseCase

describe('Fetch Transactions Use Case', () => {
	beforeEach(() => {
		transactionsRepository = new InMemoryTransactionsRepository()
		accountsRepository = new InMemoryAccountsRepository()
		sut = new FetchTransactionsUseCase(transactionsRepository)
	})

	it('should be able to fetch transactions', async () => {
		const createdAccount = await accountsRepository.create({
			balance: 0,
			bank: 'bank',
			type: 'CURRENT_ACCOUNT',
			number: '1111 2222 3333 4444',
			userId: 'user-01',
		})

		await transactionsRepository.create({
			userId: randomUUID(),
			category: 'OTHERS',
			accountId: createdAccount.id,
			amount: 3500,
			shopName: 'KaBuM-01',
			transaction_type: 'DEBIT',
			payment_method: 'CREDIT_CARD',
			name: 'RTX 3060',
		})

		await transactionsRepository.create({
			userId: 'user-01',
			category: 'OTHERS',
			accountId: createdAccount.id,
			amount: 3500,
			shopName: 'KaBuM-02',
			transaction_type: 'DEBIT',
			payment_method: 'CREDIT_CARD',
			name: 'RTX 3060',
		})

		const { transactions } = await sut.execute({ accountId: createdAccount.id })

		expect(transactions).toHaveLength(2)
		expect(transactions).toEqual([
			expect.objectContaining({ shopName: 'KaBuM-01' }),
			expect.objectContaining({ shopName: 'KaBuM-02' }),
		])
	})
})
