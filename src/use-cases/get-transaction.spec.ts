import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { GetTransactionUseCase } from './get-transaction'

let transactionsRepository: TransactionsRepository
let accountsRepository: AccountsRepository
let sut: GetTransactionUseCase

describe('Get Account Use Case', () => {
	beforeEach(() => {
		transactionsRepository = new InMemoryTransactionsRepository()
		accountsRepository = new InMemoryAccountsRepository()
		sut = new GetTransactionUseCase(transactionsRepository)
	})

	it('should be able to get a transaction', async () => {
		await accountsRepository.create({
			id: 'account-1',
			balance: 0,
			bank: 'Nubank',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId: randomUUID(),
		})

		const createTransaction = await transactionsRepository.create({
			userId: randomUUID(),
			categoryId: randomUUID(),
			accountId: 'account-1',
			amount: 3500,
			shopName: 'KaBuM',
			type: 'sent',
			payment_method: 'credit-card',
			paid_at: null,
			name: 'RTX 3060',
		})

		const { transaction } = await sut.execute({
			transactionId: createTransaction.id,
		})

		expect(transaction.id).toEqual(transaction.id)
	})
})
