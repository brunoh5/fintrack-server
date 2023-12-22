import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Fetch Bills (e2e)', () => {
	it('should be able to fetch bills', async () => {
		const { token } = await createAndAuthenticateUser(app)

		await request(app)
			.post('/bills')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'bills-01',
				description: 'api de pagamentos',
				imageUrl: null,
				amount: 3500,
				dueDate: new Date('12-20-2023'),
				lastCharge: null,
				paid_at: null,
			})

		await request(app)
			.post('/bills')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'bills-02',
				description: 'api de pagamentos',
				imageUrl: null,
				amount: 3500,
				dueDate: new Date('12-20-2023'),
				lastCharge: null,
				paid_at: null,
			})

		const response = await request(app)
			.get('/bills')
			.set('Authorization', `Bearer ${token}`)

		expect(response.statusCode).toEqual(200)
		expect(response.body.bills).toEqual([
			expect.objectContaining({
				title: 'bills-01',
			}),
			expect.objectContaining({
				title: 'bills-02',
			}),
		])
	})
})
