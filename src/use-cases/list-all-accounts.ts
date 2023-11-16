import { hideAccountNumber } from '@/lib/hideAccountNumber'
import { prisma } from '@/lib/prisma'
import { Account } from '@prisma/client'

interface ListAllAccountsUseCaseRequest {
	userId: string
}

interface ListAllAccountsUseCaseResponse {
	accounts: Account[]
}

export class ListAllAccountsUseCase {
	async execute(
		data: ListAllAccountsUseCaseRequest,
	): Promise<ListAllAccountsUseCaseResponse> {
		const accountsResponse = await prisma.account.findMany({
			where: {
				userId: data.userId,
			},
		})

		const accounts = accountsResponse.map((account) => {
			const { number } = account

			let formattedNumber = ''

			if (number) {
				formattedNumber = hideAccountNumber(number)
			}

			return {
				...account,
				number: formattedNumber || null,
			}
		})

		return { accounts }
	}
}
