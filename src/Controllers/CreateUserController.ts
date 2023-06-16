import { Request, Response } from 'express'
import { hash } from 'bcryptjs'

import { AppError } from '../AppError'
import { prisma } from '../lib/prisma'

class CreateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body

		if (!name || !email || !password) {
			throw new AppError('> Fields must be all filled')
		}

		const userAlreadyExists = await prisma.users.findFirst({ where: { email } })

		if (userAlreadyExists) {
			throw new AppError('> User already exists')
		}

		const passwordHash = await hash(password, 8)

		const user = await prisma.users.create({
			data: {
				name,
				email,
				password: passwordHash,
			},
		})

		return res.status(201).json(user)
	}
}

export { CreateUserController }
