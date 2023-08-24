import { Request, Response } from 'express'
import { prisma } from '@/lib/prisma'
import { AppError } from '@/AppError'

export class AccountsController {
	async create(req: Request, res: Response): Promise<Response> {
		const { accountType, bank, accountNumber, initialAmount } = req.body
		const { id } = req.user

		try {
			const account = await prisma.accounts.create({
				data: {
					accountType,
					bank,
					// bankImgUrl,
					accountNumber,
					balance: initialAmount,
					userId: id,
				},
			})

			return res.status(201).json(account)
		} catch (err) {
			console.log(err)
			throw new AppError(`Error creating the account` + err)
		}
	}

	async list(req: Request, res: Response): Promise<Response> {
		const { id } = req.params

		const account = await prisma.accounts.findFirst({
			where: {
				id,
			},
		})

		return res.json(account)
	}

	async listAll(req: Request, res: Response): Promise<Response> {
		const { id } = req.user

		const accounts = await prisma.accounts.findMany({
			where: {
				userId: id,
			},
		})

		return res.json(accounts)
	}

	async update(req: Request, res: Response): Promise<Response> {
		const { id, accountType, bank, accountNumber } = req.body

		try {
			const account = await prisma.accounts.update({
				where: {
					id,
				},
				data: {
					accountType,
					bank,
					accountNumber,
				},
			})

			return res.status(201).json(account)
		} catch (err) {
			throw new AppError('Error creating the account')
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.body

		try {
			await prisma.accounts.delete({ where: { id } })

			return res.status(204).json()
		} catch (err) {
			throw new AppError('> Error deleting an account')
		}
	}
}
