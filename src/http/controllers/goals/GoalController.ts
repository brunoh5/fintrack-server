import { Request, Response } from 'express'

import { prisma } from '@/lib/prisma'

export class GoalsController {
	async list(req: Request, res: Response): Promise<Response> {
		const { id } = req.user

		const goals = await prisma.goal.findMany({
			where: {
				userId: id,
			},
		})

		return res.json(goals)
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params
		const { targetAmount, presentAmount } = req.body

		const goal = await prisma.goal.update({
			where: { id },
			data: {
				targetAmount,
				presentAmount,
			},
		})

		return res.json(goal)
	}
}
