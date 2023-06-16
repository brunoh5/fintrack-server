import { Request, Response } from 'express'

import { prisma } from '@/lib/prisma'
class ListUsersController {
	async handle(req: Request, res: Response) {
		const users = await prisma.users.findMany()

		return res.status(200).json(users)
	}
}

export { ListUsersController }
