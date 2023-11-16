import { ListAccountUseCase } from '@/use-cases/list-account'
import { Request, Response } from 'express'
import { z } from 'zod'

export class ListAccount {
	async handle(req: Request, res: Response): Promise<Response> {
		const listAccountParamsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = listAccountParamsSchema.parse(req.params)

		const listAccountUseCase = new ListAccountUseCase()

		const account = listAccountUseCase.execute({
			accountId: id,
		})

		return res.json({ account })
	}
}
