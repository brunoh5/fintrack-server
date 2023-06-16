/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'

import { AppError } from '@/AppError'
import { prisma } from '@/lib/prisma'
import { StatementsRepository } from '@/Repositories/StatementsRepository'
import { AccountsRepository } from '@/Repositories/AccountsRepository'

class CreateStatementController {
	constructor(
		private statementsRepository: StatementsRepository,
		private accountsRepository: AccountsRepository,
	) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const { accountId, description, amount, type } = req.body
		const userId = req.headers.authorization

		if (!userId) {
			throw new AppError('> You must be logged in', 401)
		}

		const statement = await this.statementsRepository.create({
			userId,
			accountId,
			description,
			amount,
			type,
		})

		if (statement.id) {
			const balance = await this.accountsRepository.getBalanceById(accountId)

			await prisma.accounts.update({
				where: { id: accountId },
				data: {
					balance: balance + amount,
				},
			})
		}

		return res.status(201).json(statement)
	}
}

export { CreateStatementController }
