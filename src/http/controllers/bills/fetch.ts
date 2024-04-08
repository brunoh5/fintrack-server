import { Request, Response } from 'express'
import { z } from 'zod'

import { makeFetchBillUseCase } from '@/use-cases/factories/makeFetchBillsUseCase'

export async function fetch(req: Request, res: Response) {
	const fetchBillsQuerySchema = z.object({
		pageIndex: z.coerce.number().default(0).optional(),
		title: z.string().optional(),
	})

	const { pageIndex = 0, title } = fetchBillsQuerySchema.parse(req.query)

	const fetchBillsUseCase = makeFetchBillUseCase()

	const { bills, meta } = await fetchBillsUseCase.execute({
		pageIndex,
		title,
		userId: req.user.sub,
	})

	return res.json({ bills, meta })
}
