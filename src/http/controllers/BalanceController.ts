import { prisma } from '@/lib/prisma'
import { Request, Response } from 'express'

export class BalanceController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { accountId } = req.params

		const balance = await prisma.account.findFirst({
			where: { id: accountId },
			select: {
				balance: true,
			},
		})

		return res.json(balance)
	}
}
