import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { GetBalanceUseCase } from './get-balance'

let accountsRepository: AccountsRepository
let sut: GetBalanceUseCase

describe('Get Balance Use Case', () => {
	beforeEach(() => {
		accountsRepository = new InMemoryAccountsRepository()
		sut = new GetBalanceUseCase(accountsRepository)
	})

	it('should be able to get a account balance', async () => {
		const createdAccount = await accountsRepository.create({
			balance: 3500,
			bank: 'Nubank',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId: randomUUID(),
		})

		const { balance } = await sut.execute({ accountId: createdAccount.id })

		expect(balance).toEqual(3500)
	})
})
