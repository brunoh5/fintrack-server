import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Create Account (e2e)', () => {
	it('should be able to create a account', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const response = await request(app)
			.post('/accounts')
			.set('Authorization', `Bearer ${token}`)
			.send({
				initialAmount: 3500,
				bank: 'bank',
				type: 'Conta Corrente',
				number: '1111 2222 3333 4444',
			})

		expect(response.status).toEqual(201)
		expect(response.body.account).toEqual(
			expect.objectContaining({
				id: expect.any(String),
			}),
		)
	})
})
