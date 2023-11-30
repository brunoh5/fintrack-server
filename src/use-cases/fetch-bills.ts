import { BillsRepository } from '@/repositories/bills-repository'
import { Bill } from '@prisma/client'

interface FetchBillsUseCaseRequest {
	id: string
	dueDate: string
	imageUrl: string
	title: string
	description: string
	lastCharge: string
	amount: number
	created_at: string
	paid_at?: string
	userId: string
}

interface FetchBillsUseCaseResponse {
	bill: Bill
}

export class FetchBillsUseCase {
	constructor(private billsRepository: BillsRepository) {}

	async execute(
		data: FetchBillsUseCaseRequest,
	): Promise<FetchBillsUseCaseResponse> {
		const bill = await this.billsRepository.create({
			...data,
		})

		return {
			bill,
		}
	}
}
