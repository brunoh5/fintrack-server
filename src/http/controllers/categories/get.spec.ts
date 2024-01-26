import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Get Category (e2e)', () => {
	it('should be able to get a category', async () => {
		const { token } = await createAndAuthenticateUser(app)

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
