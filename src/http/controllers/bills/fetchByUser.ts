import { makeFetchBillUseCase } from '@/use-cases/factories/makeFetchBillsUseCase'
import { Request, Response } from 'express'

export async function fetchByUser(req: Request, res: Response) {
	const { sub: userId } = req.user

	const fetchBillsUseCase = makeFetchBillUseCase()

	const { bills } = await fetchBillsUseCase.execute(userId)

	return res.json({ bills })
}
