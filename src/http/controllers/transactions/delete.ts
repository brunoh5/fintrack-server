import { Request, Response } from 'express'
import { z } from 'zod'

import { makeDeleteTransactionUseCase } from '@/use-cases/factories/makeDeleteTransactionUseCase'

export async function deleteTransaction(
	req: Request,
	res: Response,
): Promise<Response> {
	const deleteTransactionParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = deleteTransactionParamsSchema.parse(req.params)

	const deleteTransactionUseCase = makeDeleteTransactionUseCase()

	const transaction = await deleteTransactionUseCase.execute({
		transactionId: id,
	})

	return res.status(200).send({ transaction })
}
