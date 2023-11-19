import { InMemoryTransactionsRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateTransactionUseCase } from './update-transaction'

let transactionsRepository: TransactionsRepository
let sut: UpdateTransactionUseCase

describe('Update Transaction UseCase', () => {
	beforeEach(() => {
		transactionsRepository = new InMemoryTransactionsRepository()
		sut = new UpdateTransactionUseCase(transactionsRepository)
	})

	it('should be able to update a transaction', async () => {
		const createdTransaction = await transactionsRepository.create({
			userId: randomUUID(),
			categoryId: randomUUID(),
			accountId: randomUUID(),
			amount: 3500,
			shopName: 'KaBuM-01',
			type: 'sent',
			payment_method: 'credit-card',
			paid_at: null,
			name: 'RTX 3060',
		})

		const { transaction } = await sut.execute({
			transactionId: createdTransaction.id,
			amount: 3500,
			shopName: 'KaBuM-02',
			type: 'sent',
			payment_method: 'credit-card',
			paid_at: null,
			name: 'RTX 3060',
		})

		expect(transaction.shopName).toEqual('KaBuM-02')
	})
})
