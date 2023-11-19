import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateAccountUseCase } from './update-account'

let accountsRepository: AccountsRepository
let sut: UpdateAccountUseCase

describe('Update Account UseCase', () => {
	beforeEach(() => {
		accountsRepository = new InMemoryAccountsRepository()
		sut = new UpdateAccountUseCase(accountsRepository)
	})

	it('should be able to update a account', async () => {
		const createdAccount = await accountsRepository.create({
			balance: 3500,
			bank: 'bank-01',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId: 'user-01',
		})

		const { account } = await sut.execute({
			accountId: createdAccount.id,
			bank: 'bank-02',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
		})

		expect(account.bank).toEqual('bank-02')
	})
})
