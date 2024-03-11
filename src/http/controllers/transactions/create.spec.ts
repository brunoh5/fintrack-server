import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAccount } from '@/utils/tests/create-account'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Create Transaction (e2e)', () => {
	it('should be able to create a transaction', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const { account } = await createAccount(token)

		const response = await request(app)
			.post('/transactions')
			.set('Authorization', `Bearer ${token}`)
			.send({
				category: 'OTHERS',
				accountId: account.id,
				amount: 3500,
				shopName: 'KaBuM',
				transaction_type: 'DEBIT',
				payment_method: 'CREDIT_CARD',
				name: 'RTX 3060',
			})

		expect(response.statusCode).toEqual(201)
		expect(response.body.transaction).toEqual(
			expect.objectContaining({
				id: expect.any(String),
			}),
		)
	})
})
