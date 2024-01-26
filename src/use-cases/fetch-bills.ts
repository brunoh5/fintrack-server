import { Bill } from '@prisma/client'

import { BillsRepository } from '@/repositories/bills-repository'

interface FetchBillsUseCaseResponse {
	bills: Bill[]
}

export class FetchBillsUseCase {
	constructor(private billsRepository: BillsRepository) {}

	async execute(userId: string): Promise<FetchBillsUseCaseResponse> {
		const bills = await this.billsRepository.findBillsByUserId(userId)

		return {
			bills,
		}
	}
}
