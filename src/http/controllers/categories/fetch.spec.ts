import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Fetch Categories (e2e)', () => {
	it('should be able to fetch a categories', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const response = await request(app)
			.get(`/categories`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.status).toEqual(200)
		expect(response.body.categories.length).toEqual(6)
	})
})
