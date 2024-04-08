import { Bill } from '@prisma/client'

import { BillsRepository } from '@/repositories/bills-repository'

interface FetchBillsUseCaseProps {
	userId: string
	title?: string
	pageIndex: number
}

interface FetchBillsUseCaseResponse {
	bills: Bill[]
	meta: {
		totalCount: number
		pageIndex: number
		perPage: number
	}
}

export class FetchBillsUseCase {
	constructor(private billsRepository: BillsRepository) {}

	async execute({
		userId,
		title,
		pageIndex,
	}: FetchBillsUseCaseProps): Promise<FetchBillsUseCaseResponse> {
		const { bills, billsCount } = await this.billsRepository.findManyBills({
			userId,
			title,
			pageIndex,
		})

		return {
			bills,
			meta: {
				totalCount: billsCount,
				pageIndex,
				perPage: 10,
			},
		}
	}
}
