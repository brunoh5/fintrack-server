import { hash } from 'bcryptjs'
import { Express } from 'express'
import request from 'supertest'

import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(app: Express) {
	await prisma.user.create({
		data: {
			name: 'John create',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
		},
	})

	const authResponse = await request(app).post('/sessions').send({
		email: 'johndoe@example.com',
		password: '123456',
	})

	const { token } = authResponse.body

	return {
		token,
	}
}
