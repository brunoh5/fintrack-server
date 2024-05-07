import { Request, Response } from 'express'
import { z } from 'zod'

import { makeGetBillUseCase } from '@/use-cases/factories/makeGetBillUseCase'

export async function get(req: Request, res: Response): Promise<Response> {
	const getBillParamsSchema = z.object({
		billId: z.string().uuid(),
	})

	const { billId } = getBillParamsSchema.parse(req.params)

	const getBillUseCase = makeGetBillUseCase()

	const bill = await getBillUseCase.execute({
		billId,
	})

	return res.json({ bill })
}
