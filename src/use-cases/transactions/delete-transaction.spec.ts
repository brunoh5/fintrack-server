import { beforeEach, describe, expect, it } from 'vitest'

import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

import { DeleteTransactionUseCase } from './delete-transaction'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let transactionsRepository: TransactionsRepository
let accountsRepository: AccountsRepository
let sut: DeleteTransactionUseCase

describe('Delete Transaction UseCase', () => {
	beforeEach(async () => {
		transactionsRepository = new InMemoryTransactionsRepository()
		accountsRepository = new InMemoryAccountsRepository()
		sut = new DeleteTransactionUseCase(
			transactionsRepository,
			accountsRepository,
		)

		await accountsRepository.create({
			id: 'account-01',
			balance: 0,
			bank: 'bank',
			type: 'CURRENT_ACCOUNT',
			number: '1111 2222 3333 4444',
			userId: 'user-01',
		})
	})

	it('should be able to delete a transaction', async () => {
		const createdTransaction = await transactionsRepository.create({
			userId: 'user-id',
			category: 'OTHERS',
			accountId: 'account-01',
			amount: 3500,
			shopName: 'KaBuM',
			transaction_type: 'CREDIT',
			payment_method: 'CREDIT_CARD',
			name: 'RTX 3060',
		})

		await sut.execute({
			transactionId: createdTransaction.id,
		})

		const deleteTransaction = await transactionsRepository.findById(
			createdTransaction.id,
		)

		expect(deleteTransaction).toEqual(null)
	})

	it('should be able to update a account balance', async () => {
		const createdTransaction = await transactionsRepository.create({
			name: 'RTX 3060',
			userId: 'user-id',
			category: 'OTHERS',
			accountId: 'account-01',
			amount: 3500,
			shopName: 'KaBuM',
			transaction_type: 'DEBIT',
			payment_method: 'CREDIT_CARD',
		})

		await sut.execute({
			transactionId: createdTransaction.id,
		})

		const account = await accountsRepository.findById('account-01')

		if (!account) {
			throw new ResourceNotFoundError()
		}

		expect(account.balance / 100).toEqual(3500)
	})
})
