import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { AppError } from '@/AppError'
import { env } from '@/env'
import { prisma } from '@/lib/prisma'

interface AuthenticateUserUseCaseRequest {
	email: string
	password: string
}

interface AuthenticateUserUseCaseResponse {
	token: string
	user: {
		name: string
		email: string
	}
}

export class AuthenticateUserUseCase {
	async execute({
		email,
		password,
	}: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
		const user = await prisma.user.findFirst({ where: { email } })

		if (!user) {
			throw new AppError(`> User doesn't exists`, 401)
		}

		const passwordMatch = await compare(password, user.password_hash)

		if (!passwordMatch) {
			throw new AppError('> Email or password incorrect.', 401)
		}

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
