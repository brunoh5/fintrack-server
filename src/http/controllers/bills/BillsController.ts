import { prisma } from '@/lib/prisma'
import { Request, Response } from 'express'

export class BillController {
	async create(req: Request, res: Response) {
		const { dueDate, title, description, lastCharge, amount, paid_at } =
			req.body
		const { id } = req.user

		const bill = await prisma.bill.create({
			data: {
				userId: id,
				dueDate,
				title,
				description,
				lastCharge,
				amount,
				paid_at,
			},
		})

		return res.status(201).json({ bill })
	}
}
