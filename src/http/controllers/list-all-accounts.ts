import { ListAllAccountsUseCase } from '@/use-cases/list-all-accounts'
import { Request, Response } from 'express'

export class ListAllAccounts {
	async handle(req: Request, res: Response) {
		const { id } = req.user

		const listAllAccountsUseCase = new ListAllAccountsUseCase()

		const accounts = listAllAccountsUseCase.execute({ userId: id })

		return res.json({ accounts })
	}
}
