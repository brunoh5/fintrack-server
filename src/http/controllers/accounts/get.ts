import { Request, Response } from 'express'
import { z } from 'zod'

import { makeGetAccountUseCase } from '@/use-cases/factories/makeGetAccountUseCase'

export async function get(req: Request, res: Response): Promise<Response> {
	const listAccountParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = listAccountParamsSchema.parse(req.params)

	const listAccountUseCase = makeGetAccountUseCase()

	const { account } = await listAccountUseCase.execute({
		accountId: id,
	})

	return res.json({ account })
}
