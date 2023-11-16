import { DeleteAccountUseCase } from '@/use-cases/delete-account'
import { Request, Response } from 'express'
import { z } from 'zod'

export class DeleteAccount {
	async handle(req: Request, res: Response): Promise<Response> {
		const deleteAccountParamsSchema = z.object({
			id: z.string().uuid(),
		})

		const { id } = deleteAccountParamsSchema.parse(req.params)

		const deleteAccountUseCase = new DeleteAccountUseCase()

		await deleteAccountUseCase.execute({ accountId: id })

		return res.status(204).send()
	}
}
