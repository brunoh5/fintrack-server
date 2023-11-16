import { CreateTransactionUseCase } from '@/use-cases/create-transaction'
import { Request, Response } from 'express'
import { z } from 'zod'

export class CreateTransaction {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.user

		const createTransactionBodySchema = z.object({
			accountId: z.string().uuid(),
			categoryId: z.string().uuid(),
			name: z.string(),
			shopName: z.string(),
			amount: z.coerce.number(),
			paid_at: z.string().nullable(),
			type: z.enum(['received', 'sent']),
			payment_method: z.string(),
		})

		const {
			accountId,
			categoryId,
			name,
			shopName,
			amount,
			paid_at,
			type,
			payment_method,
		} = createTransactionBodySchema.parse(req.body)

		const createTransactionUseCase = new CreateTransactionUseCase()

		const transaction = await createTransactionUseCase.execute({
			accountId,
			categoryId,
			name,
			shopName,
			amount,
			paid_at,
			type,
			payment_method,
			userId: id,
		})

		return res.status(201).json({ transaction })
	}
}
