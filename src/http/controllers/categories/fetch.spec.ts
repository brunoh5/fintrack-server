import { app } from '@/app'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Fetch Categories (e2e)', () => {
	beforeEach(async () => {
		await request(app).post('/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})
	})

	it('should be able to fetch a categories', async () => {
		const authResponse = await request(app).post('/sessions').send({
			email: 'johndoe@example.com',
			password: '123456',
		})

		const { token } = authResponse.body

		const response = await request(app)
			.get(`/categories`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.status).toEqual(200)
		expect(response.body.categories.length).toEqual(6)
	})
})
