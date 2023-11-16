import { Request, Response } from 'express'
import { prisma } from '@/lib/prisma'

export class TransactionsController {
	async list(req: Request, res: Response): Promise<Response> {
		const { id } = req.params

		const transactions = await prisma.transaction.findMany({
			where: {
				accountId: id,
			},

			include: {
				category: true,
			},
		})

		return res.json({ transactions })
	}

	async listByUserId(req: Request, res: Response): Promise<Response> {
		const { id } = req.user

		const transactions = await prisma.transaction.findMany({
			where: {
				userId: id,
			},

			include: {
				category: true,
			},
		})

		return res.json({ transactions })
	}
}
