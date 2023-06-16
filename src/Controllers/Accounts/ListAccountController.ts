/* eslint-disable no-useless-constructor */
import { Request, Response } from 'express'

import { AccountsRepository } from '@/Repositories/AccountsRepository'
import { AppError } from '@/AppError'
import { inject } from 'tsyringe'

class ListAccountsController {
	constructor(
		@inject('AccountsRepository')
		private accountsRepository: AccountsRepository,
	) {}

	async handle(req: Request, res: Response) {
		const userId = req.headers.authorization

		if (!userId) {
			throw new AppError('ID Invalid', 401)
		}

		const accounts = await this.accountsRepository.findByUserId(userId)

		return res.status(200).json(accounts)
	}
}

export { ListAccountsController }
