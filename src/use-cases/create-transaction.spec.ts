import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Account } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTransactionUseCase } from './create-transaction'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let transactionsRepository: TransactionsRepository
let accountsRepository: AccountsRepository
let sut: CreateTransactionUseCase

describe('Create Transactions UseCase', () => {
	beforeEach(() => {
		transactionsRepository = new InMemoryTransactionsRepository()
		accountsRepository = new InMemoryAccountsRepository()
		sut = new CreateTransactionUseCase(
			transactionsRepository,
			accountsRepository,
		)
	})

	it('should be able to create a transaction', async () => {
		const createdAccount = await accountsRepository.create({
			balance: 0,
			bank: 'Nubank',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId: randomUUID(),
		})

		const { transaction } = await sut.execute({
			userId: randomUUID(),
			categoryId: randomUUID(),
			accountId: createdAccount.id,
			amount: 3500,
			shopName: 'KaBuM',
			type: 'sent',
			payment_method: 'credit-card',
			paid_at: null,
			name: 'RTX 3060',
		})

		expect(transaction.id).toEqual(expect.any(String))
	})

	it('should be able to update a account balance', async () => {
		const createdAccount = await accountsRepository.create({
			balance: 0,
			bank: 'Nubank',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId: randomUUID(),
		})

		await sut.execute({
			userId: randomUUID(),
			categoryId: randomUUID(),
			accountId: createdAccount.id,
			amount: 3500,
			shopName: 'KaBuM',
			type: 'sent',
			payment_method: 'credit-card',
			paid_at: null,
			name: 'RTX 3060',
		})

		const account = (await accountsRepository.findById(
			createdAccount.id,
		)) as Account

		expect(account.balance.d[0]).toEqual(3500)
	})

	it('should not be able to create a transaction with non-existent account', async () => {
		await expect(() =>
			sut.execute({
				userId: randomUUID(),
				categoryId: randomUUID(),
				accountId: 'non-existent-account',
				amount: 3500,
				shopName: 'KaBuM',
				type: 'sent',
				payment_method: 'credit-card',
				paid_at: null,
				name: 'RTX 3060',
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
