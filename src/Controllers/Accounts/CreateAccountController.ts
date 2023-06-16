/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'

import { AppError } from '@/AppError'
import { AccountsRepository } from '@/Repositories/AccountsRepository'

class CreateAccountController {
	constructor(private accountRepository: AccountsRepository) {}

	async handle(req: Request, res: Response): Promise<Response> {
		const { name, description, balance, type, bank } = req.body
		const userId = req.headers.authorization

		if (!userId) {
			throw new AppError('> You must be logged in', 401)
		}

		const account = await this.accountRepository.create({
			userId,
			name,
			description,
			balance,
			type,
			bank,
		})

		return res.status(201).json(account)
	}
}

export { CreateAccountController }
