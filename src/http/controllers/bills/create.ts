import { prisma } from '@/lib/prisma'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function create(req: Request, res: Response) {
	const { sub: userId } = req.user

	const createBillBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		imageUrl: z.string().nullable(),
		amount: z.number().default(0),
		dueDate: z.string(),
		lastCharge: z.string().nullable(),
		paid_at: z.string().nullable(),
	})

	const { amount, description, dueDate, imageUrl, lastCharge, paid_at, title } =
		createBillBodySchema.parse(req.body)

	const bill = await prisma.bill.create({
		data: {
			imageUrl,
			userId,
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
