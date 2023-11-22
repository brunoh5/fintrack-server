import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
	beforeAll(async () => {
		await prisma.$connect()
	})

	afterAll(async () => {
		await prisma.$disconnect()
	})

	it('should be able to register', async () => {
		const response = await request(app).post('/users').send({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})

		expect(response.status).toEqual(201)
	})
})
