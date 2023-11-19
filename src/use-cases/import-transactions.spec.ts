import { AccountsRepository } from '@/repositories/accounts-repository'
import { InMemoryAccountsRepository } from '@/repositories/in-memory/in-memory-accounts-repository'
import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Account } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { ImportTransactionsUseCase } from './import-transactions'

let transactionsRepository: TransactionsRepository
let accountsRepository: AccountsRepository
let sut: ImportTransactionsUseCase

describe('Import Transactions UseCase', () => {
	beforeEach(() => {
		transactionsRepository = new InMemoryTransactionsRepository()
		accountsRepository = new InMemoryAccountsRepository()
		sut = new ImportTransactionsUseCase(
			transactionsRepository,
			accountsRepository,
		)
	})

	it('should be able to create many transactions', async () => {
		const createdAccount = await accountsRepository.create({
			balance: 0,
			bank: 'bank',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId: 'user-01',
		})

		const dataTransactions = [
			{
				userId: randomUUID(),
				categoryId: randomUUID(),
				accountId: createdAccount.id,
				amount: 3500,
				shopName: 'KaBuM 1',
				type: 'sent',
				payment_method: 'credit-card',
				paid_at: null,
				name: 'RTX 3060',
			},
			{
				userId: randomUUID(),
				categoryId: randomUUID(),
				accountId: createdAccount.id,
				amount: 3500,
				shopName: 'KaBuM 2',
				type: 'sent',
				payment_method: 'credit-card',
				paid_at: null,
				name: 'RTX 3060',
			},
		]

		await sut.execute({
			userId: 'user-01',
			categoryId: 'category-01',
			accountId: createdAccount.id,
			transactions: dataTransactions,
		})

		const transactions = await transactionsRepository.findManyByAccountId(
			createdAccount.id,
		)

		expect(transactions).toEqual([
			expect.objectContaining({ shopName: 'KaBuM 1' }),
			expect.objectContaining({ shopName: 'KaBuM 2' }),
		])
	})

	it('should be able to update a account balance', async () => {
		const createdAccount = await accountsRepository.create({
			balance: 0,
			bank: 'bank',
			type: 'Conta Corrente',
			number: '1111 2222 3333 4444',
			userId: 'user-01',
		})

		const dataTransactions = [
			{
				userId: randomUUID(),
				categoryId: randomUUID(),
				accountId: createdAccount.id,
				amount: 3500,
				shopName: 'KaBuM 1',
				type: 'sent',
				payment_method: 'credit-card',
				paid_at: null,
				name: 'RTX 3060',
			},
			{
				userId: randomUUID(),
				categoryId: randomUUID(),
				accountId: createdAccount.id,
				amount: 3500,
				shopName: 'KaBuM 2',
				type: 'sent',
				payment_method: 'credit-card',
				paid_at: null,
				name: 'RTX 3060',
			},
		]

		await sut.execute({
			userId: 'user-01',
			categoryId: 'category-01',
			accountId: createdAccount.id,
			transactions: dataTransactions,
		})

		const account = (await accountsRepository.findById(
			createdAccount.id,
		)) as Account

		expect(account.balance.d[0]).toEqual(7000)
	})
})
