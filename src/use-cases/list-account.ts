import { hideAccountNumber } from '@/lib/hideAccountNumber'
import { prisma } from '@/lib/prisma'

interface ListAccountUseCaseRequest {
	accountId: string
}

export class ListAccountUseCase {
	async execute({ accountId }: ListAccountUseCaseRequest) {
		const accountResponse = await prisma.account.findFirst({
			where: {
				id: accountId,
			},
		})

		let formattedNumber = ''

		if (accountResponse && accountResponse.number) {
			formattedNumber = hideAccountNumber(accountResponse.number)
		}

		const account = {
			...accountResponse,
			number: formattedNumber || null,
		}

		return {
			account,
		}
	}
}
