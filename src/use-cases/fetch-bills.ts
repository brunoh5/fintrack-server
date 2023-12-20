import { BillsRepository } from '@/repositories/bills-repository'
import { Bill } from '@prisma/client'

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
