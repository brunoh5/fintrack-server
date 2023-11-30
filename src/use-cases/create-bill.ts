import { BillsRepository } from '@/repositories/bills-repository'
import { Bill } from '@prisma/client'

interface CreateBillUseCaseRequest {
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

interface CreateBillUseCaseResponse {
	bill: Bill
}

export class CreateBillUseCase {
	constructor(private billsRepository: BillsRepository) {}

	async execute(
		data: CreateBillUseCaseRequest,
	): Promise<CreateBillUseCaseResponse> {
		const bill = await this.billsRepository.create({
			...data,
		})

		return {
			bill,
		}
	}
}
