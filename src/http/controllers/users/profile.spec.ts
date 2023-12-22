import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Profile (e2e)', () => {
	it('should be able to get user profile', async () => {
		const { token } = await createAndAuthenticateUser(app)

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
