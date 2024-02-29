import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Create Account (e2e)', () => {
	it('should be able to create a account', async () => {
		const { token } = await createAndAuthenticateUser(app)

		await request(app)
			.post('/accounts')
			.set('Authorization', `Bearer ${token}`)
			.send({
				initialAmount: 3500,
				bank: 'bank-01',
				type: 'CURRENT_ACCOUNT',
				number: '1111 2222 3333 4444',
			})

		await request(app)
			.post('/accounts')
			.set('Authorization', `Bearer ${token}`)
			.send({
				initialAmount: 3500,
				bank: 'bank-02',
				type: 'CURRENT_ACCOUNT',
				number: '1111 2222 3333 4444',
			})

		const response = await request(app)
			.get('/accounts')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.status).toEqual(200)
		expect(response.body.accounts.length).toEqual(2)
		expect(response.body.accounts).toEqual([
			expect.objectContaining({ bank: 'bank-01' }),
			expect.objectContaining({ bank: 'bank-02' }),
		])
	})
})
