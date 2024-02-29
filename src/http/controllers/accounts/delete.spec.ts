import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAccount } from '@/utils/tests/create-account'
import { createAndAuthenticateUser } from '@/utils/tests/create-user-and-authenticate'

describe('Delete Account (e2e)', () => {
	it('should be able to delete a account', async () => {
		const { token } = await createAndAuthenticateUser(app)

		const { account } = await createAccount(token)

		const response = await request(app)
			.delete(`/accounts/${account.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.status).toEqual(204)
	})
})
