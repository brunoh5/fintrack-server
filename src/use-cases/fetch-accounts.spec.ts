import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { FetchAccountsUseCase } from './fetch-accounts'

let accountsRepository: AccountsRepository
let sut: FetchAccountsUseCase

describe('Fetch Accounts Use Case', () => {
	beforeEach(() => {
		accountsRepository = new InMemoryAccountsRepository()
		sut = new FetchAccountsUseCase(accountsRepository)
	})

	it('should be able to fetch accounts', async () => {
		const userId = randomUUID()

		await accountsRepository.create({
			balance: 3500,
			bank: 'Nubank-01',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId,
		})

		await accountsRepository.create({
			balance: 3500,
			bank: 'Nubank-02',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId,
		})

		const { accounts } = await sut.execute({ userId })

		expect(accounts).toHaveLength(2)
		expect(accounts).toEqual([
			expect.objectContaining({ bank: 'Nubank-01' }),
			expect.objectContaining({ bank: 'Nubank-02' }),
		])
	})

	it('should hide the account number', async () => {
		const userId = randomUUID()

		await accountsRepository.create({
			balance: 3500,
			bank: 'Nubank-02',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId,
		})

		const { accounts } = await sut.execute({ userId })

		expect(accounts).toEqual([
			expect.objectContaining({ number: '**** **** **** 4444' }),
		])
	})
})
