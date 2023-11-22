import { app } from '@/app'
import request from 'supertest'
import { describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
	it('should be able to get user profile', async () => {
		await request(app).post('/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		const authResponse = await request(app).post('/sessions').send({
			email: 'johndoe@example.com',
			password: '123456',
		})

		const { token } = authResponse.body

		const profileResponse = await request(app)
			.get('/me')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(profileResponse.statusCode).toEqual(200)
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({
				email: 'johndoe@example.com',
			}),
		)
	})
})
