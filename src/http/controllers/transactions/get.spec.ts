import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAccount } from '@/utils/tests/create-account'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Get Transaction (e2e)', () => {
	it('should be able to get a transaction', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const { account } = await createAccount(token)

		const transactionResponse = await request(app)
			.post('/transactions')
			.set('Authorization', `Bearer ${token}`)
			.send({
				category: 'OTHERS',
				accountId: account.id,
				amount: 3500,
				shopName: 'KaBuM-01',
				transaction_type: 'DEBIT',
				payment_method: 'CREDIT_CARD',
				name: 'RTX 3060',
			})

		const { id } = transactionResponse.body.transaction

		const response = await request(app)
			.get(`/transactions/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.transaction.id).toEqual(id)
	})
})
