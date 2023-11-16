import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { env } from '@/env'
import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
	email: string
	password: string
}

interface AuthenticateUseCaseResponse {
	token: string
	user: {
		name: string
		email: string
	}
}

export class AuthenticateUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({
		email,
		password,
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordMatches = await compare(password, user.password_hash)

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError()
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
