import { makeGetCategoryUseCase } from '@/use-cases/factories/makeGetCategoryUseCase'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function get(req: Request, res: Response) {
	const getCategoryParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = getCategoryParamsSchema.parse(req.params)

	const getCategoryUseCase = makeGetCategoryUseCase()

	const category = await getCategoryUseCase.execute({
		categoryId: id,
	})

	return res.status(200).json({ category })
}
