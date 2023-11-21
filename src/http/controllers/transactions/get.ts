import { makeGetTransactionUseCase } from '@/use-cases/factories/makeGetTransactionUseCase'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function get(req: Request, res: Response): Promise<Response> {
	const getTransactionParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = getTransactionParamsSchema.parse(req.params)

	const getTransactionUseCase = makeGetTransactionUseCase()

	const transaction = await getTransactionUseCase.execute({
		transactionId: id,
	})

	return res.json({ transaction })
}
