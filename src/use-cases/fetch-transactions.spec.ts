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
			bank: 'Nubank',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId: randomUUID(),
		})

		await transactionsRepository.create({
			userId: randomUUID(),
			categoryId: randomUUID(),
			accountId: createdAccount.id,
			amount: 3500,
			shopName: 'KaBuM-01',
			type: 'sent',
			payment_method: 'credit-card',
			paid_at: null,
			name: 'RTX 3060',
		})

		await transactionsRepository.create({
			userId: randomUUID(),
			categoryId: randomUUID(),
			accountId: createdAccount.id,
			amount: 3500,
			shopName: 'KaBuM-02',
			type: 'sent',
			payment_method: 'credit-card',
			paid_at: null,
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
