import { Request, Response } from 'express'
import { z } from 'zod'

import { makeCreateTransactionUseCase } from '@/use-cases/factories/makeCreateTransactionUseCase'
import { formatAndMultiplyAmount } from '@/utils/format-and-multiply-amount'

export async function create(req: Request, res: Response): Promise<Response> {
	const createTransactionBodySchema = z.object({
		accountId: z.string().uuid(),
		category: z.enum([
			'HOME',
			'FOOD',
			'TRANSPORTATION',
			'OTHERS',
			'ENTERTAINMENT',
			'SHOPPING',
		]),
		name: z.string(),
		shopName: z.string(),
		amount: z.string(),
		transaction_type: z.enum(['CREDIT', 'DEBIT']),
		payment_method: z.enum([
			'MONEY',
			'PIX',
			'CREDIT_CARD',
			'DEBIT_CARD',
			'BANK_TRANSFER',
		]),
	})

	const {
		accountId,
		category,
		name,
		shopName,
		amount,
		transaction_type,
		payment_method,
	} = createTransactionBodySchema.parse(req.body)

	const createTransactionUseCase = makeCreateTransactionUseCase()

	const { transaction } = await createTransactionUseCase.execute({
		accountId,
		category,
		name,
		shopName,
		amount: formatAndMultiplyAmount(amount),
		transaction_type,
		payment_method,
		userId: req.user.sub,
	})

	return res.status(201).json({ transaction })
}
