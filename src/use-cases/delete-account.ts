import { prisma } from '@/lib/prisma'

interface DeleteAccountUseCaseRequest {
	accountId: string
}

export class DeleteAccountUseCase {
	async execute(data: DeleteAccountUseCaseRequest): Promise<void> {
		await prisma.account.delete({
			where: {
				id: data.accountId,
			},
		})
	}
}
