import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

import { DeleteAccountUseCase } from './delete-account'

let accountsRepository: AccountsRepository
let transactionsRepository: TransactionsRepository
let sut: DeleteAccountUseCase

describe('Delete Account UseCase', () => {
	beforeEach(() => {
		accountsRepository = new InMemoryAccountsRepository()
		transactionsRepository = new InMemoryTransactionsRepository()
		sut = new DeleteAccountUseCase(accountsRepository, transactionsRepository)
	})

	it('should be able to delete a account', async () => {
		const createdAccount = await accountsRepository.create({
			balance: 3500,
			bank: 'bank-01',
			type: 'CURRENT_ACCOUNT',
			number: '1111 2222 3333 4444',
			userId: randomUUID(),
		})

		await sut.execute({
			accountId: createdAccount.id,
		})

		const deleteAccount = await accountsRepository.findById(createdAccount.id)

		expect(deleteAccount).toEqual(null)
	})
})
