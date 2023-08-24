import { Request, Response } from 'express'

import { AppError } from '@/AppError'
import { prisma } from '@/lib/prisma'

export class TransactionsController {
	async create(req: Request, res: Response): Promise<Response> {
		const { accountId, name, amount, shopName, createdAt } = req.body
		const { id } = req.user

		const account = await prisma.accounts.findFirst({ where: { id: accountId } })

		if (!account) {
			throw new AppError(`> This account doesn't exist`)
		}

		try {
			const createTransaction = prisma.transactions.create({
				data: {
					userId: id,
					accountId,
					name,
					shopName,
					createdAt,
					amount,
				},
			})

			const updateBalance = prisma.accounts.update({
				where: { id: account.id },
				data: {
					balance: account.balance + amount,
				},
			})

			const [transaction] = await prisma.$transaction([
				createTransaction,
				updateBalance,
			])

			return res.status(201).json(transaction)
		} catch (err) {
			throw new AppError(`> ${err}`)
		}
	}

	async list(req: Request, res: Response): Promise<Response> {
		const { id, accountId } = req.body

		const transaction = await prisma.transactions.findFirst({
			where: {
				accountId,
				id
			}
		})

		return res.status(201).json(transaction)
	}

	async listAll(req: Request, res: Response): Promise<Response> {
		const { accountId } = req.body

		const transaction = await prisma.transactions.findMany({
			where: {
				accountId,
			}
		})

		return res.status(201).json(transaction)
	}
}
