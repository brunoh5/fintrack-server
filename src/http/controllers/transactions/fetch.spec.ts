import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Fetch Transactions (e2e)', () => {
	beforeEach(async () => {
		await request(app).post('/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})
	})

	it('should be able to fetch transactions', async () => {
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
				bank: 'bank-01',
				type: 'Conta Corrente',
				number: '1111 2222 3333 4444',
			})

		const { id: accountId } = accountResponse.body.account

		const categoryResponse = await request(app)
			.get(`/categories`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		const { id: categoryId } = categoryResponse.body.categories[0]

		await request(app)
			.post('/transactions')
			.set('Authorization', `Bearer ${token}`)
			.send({
				categoryId,
				accountId,
				amount: 3500,
				shopName: 'KaBuM-01',
				type: 'sent',
				payment_method: 'credit-card',
				paid_at: null,
				name: 'RTX 3060',
			})

		await request(app)
			.post('/transactions')
			.set('Authorization', `Bearer ${token}`)
			.send({
				categoryId,
				accountId,
				amount: 3500,
				shopName: 'KaBuM-02',
				type: 'sent',
				payment_method: 'credit-card',
				paid_at: null,
				name: 'RTX 3060',
			})

		const response = await request(app)
			.get(`/transactions/${accountId}/all`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.transactions).toEqual([
			expect.objectContaining({
				shopName: 'KaBuM-01',
			}),
			expect.objectContaining({
				shopName: 'KaBuM-02',
			}),
		])
	})
})
