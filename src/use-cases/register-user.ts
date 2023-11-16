import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { AppError } from '@/AppError'
import { env } from '@/env'
import { prisma } from '@/lib/prisma'

interface RegisterUserUseCaseRequest {
	name: string
	email: string
	password: string
}

interface RegisterUserUseCaseResponse {
	token: string
	user: {
		name: string
		email: string
	}
}

export class RegisterUserUseCase {
	async execute({
		name,
		email,
		password,
	}: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
		const userAlreadyExists = await prisma.user.findFirst({
			where: { email },
		})

		if (userAlreadyExists) {
			throw new AppError('> User already exists!')
		}

		const password_hash = await hash(password, 6)

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password_hash,
			},
		})

		const token = sign({}, env.SECRET_TOKEN, {
			subject: user.id,
			expiresIn: 60 * 60 * 24, // 24 Hours,
		})

		return {
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		}
	}
}
