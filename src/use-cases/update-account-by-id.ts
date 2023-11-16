import { prisma } from '@/lib/prisma'

interface UpdateAccountByIdUseCaseRequest {
	accountId: string
	type: string
	bank: string
	number: string | null
}

export class UpdateAccountByIdUseCase {
	async execute({
		accountId,
		type,
		bank,
		number,
	}: UpdateAccountByIdUseCaseRequest) {
		const account = await prisma.account.update({
			where: {
				id: accountId,
			},
			data: {
				type,
				bank,
				number,
			},
		})

		return {
			account,
		}
	}
}
