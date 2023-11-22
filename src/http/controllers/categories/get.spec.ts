import { app } from '@/app'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Get Category (e2e)', () => {
	beforeEach(async () => {
		await request(app).post('/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})
	})

	it('should be able to get a category', async () => {
		const authResponse = await request(app).post('/sessions').send({
			email: 'johndoe@example.com',
			password: '123456',
		})

		const { token } = authResponse.body

		const categoryResponse = await request(app)
			.get(`/categories`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		const { id } = categoryResponse.body.categories[0]

		const response = await request(app)
			.get(`/categories/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.status).toEqual(200)
		expect(response.body.category).toEqual(
			expect.objectContaining({ id: expect.any(String) }),
		)
	})
})
