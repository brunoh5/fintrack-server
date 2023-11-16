import { prisma } from '@/lib/prisma'

interface CreateAccountUseCaseRequest {
	type: string
	bank: string
	number: string | null
	initialAmount: number
	userId: string
}

export class CreateAccountUseCase {
	async execute(data: CreateAccountUseCaseRequest) {
		const account = await prisma.account.create({
			data: {
				...data,
				balance: data.initialAmount,
			},
		})

		return {
			account,
		}
	}
}
