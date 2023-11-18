// import { AccountsRepository } from '@/repositories/accounts-repository'
// import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
// import { randomUUID } from 'node:crypto'
// import { beforeEach, describe, expect, it } from 'vitest'
// import { ResourceNotFoundError } from './errors/resource-not-found-error'
// import { UpdateAccountUseCase } from './update-account'

// let accountsRepository: AccountsRepository
// let sut: UpdateAccountUseCase

// describe('Update Account UseCase', () => {
// 	beforeEach(() => {
// 		accountsRepository = new InMemoryAccountsRepository()
// 		sut = new UpdateAccountUseCase(accountsRepository)
// 	})

// 	it('should be able to update a account', async () => {
// 		const createdAccount = await accountsRepository.create({
// 			balance: 3500,
// 			bank: 'Nubank-01',
// 			type: 'Conta Corrente',
// 			number: '1111 2222 3333 4444',
// 			userId: randomUUID(),
// 		})

// 		const { account } = await sut.execute({
// 			accountId: createdAccount.id,
// 			bank: 'nubank-02',
// 			type: 'Conta Corrente',
// 			number: '1111 2222 3333 4444',
// 		})

// 		expect(account.bank).toEqual('nubank-02')
// 	})

// 	it('should not be able to update a account with wrong id', async () => {
// 		await expect(() =>
// 			sut.execute({
// 				accountId: randomUUID(),
// 				bank: 'nubank-01',
// 				type: 'Conta Corrente',
// 				number: '1111 2222 3333 4444',
// 			}),
// 		).rejects.toBeInstanceOf(ResourceNotFoundError)
// 	})
// })
