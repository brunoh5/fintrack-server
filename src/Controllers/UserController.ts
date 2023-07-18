import { prisma } from '@/lib/prisma'
import { Request, Response } from 'express'
import { hash } from 'bcryptjs'

import { AppError } from '../AppError'

export class UserController {
	async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body

		const userAlreadyExists = await prisma.users.findFirst({ where: { email } })

		if (userAlreadyExists) {
			throw new AppError('> User already exists')
		}

		try {
			const passwordHash = await hash(password, 8)

			const user = await prisma.users.create({
				data: {
					name,
					email,
					password: passwordHash,
				},
			})

			return res.status(201).json(user)
		} catch (err) {
			throw new AppError(`> ${err}`)
		}
	}
}
