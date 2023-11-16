import { ListTransactionByIdUseCase } from '@/use-cases/list-transaction-by-id'
import { Request, Response } from 'express'
import { z } from 'zod'

export class ListTransactionById {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id: userId } = req.user

		const listTransactionParamsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = listTransactionParamsSchema.parse(req.params)

		const listTransactionById = new ListTransactionByIdUseCase()

		const transaction = await listTransactionById.execute({
			id,
			userId,
		})

		return res.json({ transaction })
	}
}
