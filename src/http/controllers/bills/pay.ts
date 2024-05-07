import { Request, Response } from 'express'
import { z } from 'zod'

import { makePayBillUseCase } from '@/use-cases/factories/makePayBillUseCase'

export async function pay(req: Request, res: Response) {
	const { sub } = req.user

	const payBillParamsSchema = z.object({
		billId: z.string().uuid(),
	})

	const { billId } = payBillParamsSchema.parse(req.params)

	const payBillBodySchema = z.object({
		accountId: z.string(),
		paid_at: z.string().optional(),
		paidAmount: z.number().optional(),
	})

	const { accountId, paid_at, paidAmount } = payBillBodySchema.parse(req.body)

	const payBillUseCase = makePayBillUseCase()

	await payBillUseCase.execute({
		userId: sub,
		billId,
		accountId,
		paid_at: paid_at ?? new Date(),
		paidAmount,
	})

	return res.status(204).send()
}
