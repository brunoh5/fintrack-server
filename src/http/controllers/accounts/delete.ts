import { Request, Response } from 'express'
import { z } from 'zod'

import { makeDeleteAccountUseCase } from '@/use-cases/factories/makeDeleteAccountUseCase'

export async function deleteAccount(req: Request, res: Response) {
	const deleteAccountParamsSchema = z.object({
		id: z.string().uuid(),
	})

	const { id } = deleteAccountParamsSchema.parse(req.params)

	const deleteAccountUseCase = makeDeleteAccountUseCase()

	await deleteAccountUseCase.execute({ accountId: id })

	return res.status(204).send()
}
