import { Request, Response } from 'express'
import { z } from 'zod'

import { makeFetchBillUseCase } from '@/use-cases/factories/makeFetchBillsUseCase'

export async function fetch(req: Request, res: Response) {
	const fetchBillsQuerySchema = z.object({
		pageIndex: z.coerce.number().default(0).optional(),
		title: z.string().optional(),
		status: z.string().optional(),
	})

	const {
		pageIndex = 0,
		title,
		status,
	} = fetchBillsQuerySchema.parse(req.query)

	const fetchBillsUseCase = makeFetchBillUseCase()

	const result = await fetchBillsUseCase.execute({
		pageIndex,
		title,
		status,
		userId: req.user.sub,
	})

	return res.json(result)
}
