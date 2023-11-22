import { app } from '@/app'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Create Account (e2e)', () => {
	beforeEach(async () => {
		await request(app).post('/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})
	})

	it('should be able to create a account', async () => {
		const authResponse = await request(app).post('/sessions').send({
			email: 'johndoe@example.com',
			password: '123456',
		})

		const { token } = authResponse.body

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
