import { Request, Response } from 'express'
import { z } from 'zod'

import { PrismaBillsRepository } from '@/repositories/prisma/prisma-bills-repository'

export async function create(req: Request, res: Response) {
	const { sub: userId } = req.user

	const createBillBodySchema = z.object({
		title: z.string(),
		description: z.string().optional(),
		amount: z.number(),
		dueDate: z.string(),
		paid_at: z.string().optional(),
		payment_method: z
			.enum(['MONEY', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER'])
			.default('MONEY'),
		accountId: z.string().optional(),
	})

	const { amount, description, dueDate, paid_at, title, payment_method } =
		createBillBodySchema.parse(req.body)

	const billsRepository = new PrismaBillsRepository()

	const bill = await billsRepository.create({
		title,
		description,
		amount,
		dueDate,
		paid_at,
		payment_method,
		userId,
	})

	return res.status(201).json({ bill })
}
