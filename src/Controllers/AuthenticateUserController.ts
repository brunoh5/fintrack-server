import { Request, Response } from 'express'
import { AppError } from '@/AppError'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

export class AuthenticateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body

		const user = await prisma.users.findFirst({ where: { email } })

		if (!user) {
			throw new AppError('> Email or password incorrect')
		}

		const passwordMatch = await compare(password, user.password)

		if (!passwordMatch) {
			throw new AppError('> Email or password incorrect')
		}

		const twentyFourHours = 60 * 60 * 24

		const token = sign({}, String(process.env.SECRET_TOKEN), {
			subject: user.id,
			expiresIn: twentyFourHours,
		})

		const tokenReturn = {
			token,
			user: {
				name: user.name,
				email: user.email,
			},
		}

		return res.json({ token: tokenReturn })
	}
}
