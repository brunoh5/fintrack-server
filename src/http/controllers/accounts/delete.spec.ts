import { app } from '@/app'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Delete Account (e2e)', () => {
	beforeEach(async () => {
		await request(app).post('/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})
	})

	it('should be able to delete a account', async () => {
		const authResponse = await request(app).post('/sessions').send({
			email: 'johndoe@example.com',
			password: '123456',
		})

		const { token } = authResponse.body

		const accountResponse = await request(app)
			.post('/accounts')
			.set('Authorization', `Bearer ${token}`)
			.send({
				initialAmount: 3500,
				bank: 'bank',
				type: 'Conta Corrente',
				number: '1111 2222 3333 4444',
			})

		const { id } = accountResponse.body.account

		const response = await request(app)
			.delete(`/accounts/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.status).toEqual(204)
	})
})
