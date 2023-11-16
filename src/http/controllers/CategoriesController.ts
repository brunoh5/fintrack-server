import { Request, Response } from 'express'
import { prisma } from '@/lib/prisma'

export class CategoriesController {
	// async create(req: Request, res: Response): Promise<Response> {
	// 	const { type, bank, number, initialAmount } = req.body
	// 	const { id } = req.user

	// 	const formattedInitialAmount = initialAmount.replace(',', '.')

	// 	try {
	// 		const account = await prisma.accounts.create({
	// 			data: {
	// 				type,
	// 				bank,
	// 				number,
	// 				balance: formattedInitialAmount,
	// 				userId: id,
	// 			},
	// 		})

	// 		return res.status(201).json({ account })
	// 	} catch (err) {
	// 		throw new AppError(`Error creating the account` + err)
	// 	}
	// }

	async list(req: Request, res: Response): Promise<Response> {
		const { id } = req.params

		const category = await prisma.category.findFirst({
			where: {
				id,
			},
		})

		return res.json({ category })
	}

	async listAll(req: Request, res: Response): Promise<Response> {
		const categories = await prisma.category.findMany()

		return res.json({ categories })
	}

	// async update(req: Request, res: Response): Promise<Response> {
	// 	const { id, type, bank, number } = req.body

	// 	try {
	// 		const account = await prisma.accounts.update({
	// 			where: {
	// 				id,
	// 			},
	// 			data: {
	// 				type,
	// 				bank,
	// 				number,
	// 			},
	// 		})

	// 		return res.status(201).json({ account })
	// 	} catch (err) {
	// 		throw new AppError('Error creating the account')
	// 	}
	// }

	// async delete(req: Request, res: Response): Promise<Response> {
	// 	const { id } = req.body

	// 	try {
	// 		await prisma.accounts.delete({ where: { id } })

	// 		return res.status(204).json()
	// 	} catch (err) {
	// 		throw new AppError('> Error deleting an account')
	// 	}
	// }
}
