import { makeGetBalanceUseCase } from '@/use-cases/factories/makeGetBalanceUseCase'
import { Request, Response } from 'express'
import { z } from 'zod'

export async function getBalance(
	req: Request,
	res: Response,
): Promise<Response> {
	const getBalanceParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = getBalanceParamsSchema.parse(req.params)

	const getBalanceUseCase = makeGetBalanceUseCase()

	const { balance } = await getBalanceUseCase.execute({
		accountId: id,
	})

	return res.status(200).json({ balance })
}
