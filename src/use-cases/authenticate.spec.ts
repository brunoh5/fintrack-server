import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: UsersRepository
let sut: AuthenticateUseCase

describe('Register UseCase', () => {
	beforeEach(() => {
		usersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(usersRepository)
	})

	it('should be able to register', async () => {
		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
		})

		const { token } = await sut.execute({
			email: 'johndoe@example.com',
			password: '123456',
		})

		expect(token).toEqual(expect.any(String))
	})

	it('should not be able to register with wrong email', async () => {
		await expect(() =>
			sut.execute({
				email: 'johndoe@example.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to register with wrong password', async () => {
		await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password_hash: await hash('123456', 6),
		})

		await expect(() =>
			sut.execute({
				email: 'johndoe@example.com',
				password: '123123',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})
