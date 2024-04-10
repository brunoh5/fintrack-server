import { Bill, Prisma } from '@prisma/client'

export interface FindManyBillsProps {
	userId: string
	status?: string
	title?: string
	pageIndex: number
}

interface FindManyBillsResponse {
	bills: Bill[]
	billsCount: number
	totalInCents: number
}

export interface BillsRepository {
	create(data: Prisma.BillUncheckedCreateInput): Promise<Bill>
	findManyBills(data: FindManyBillsProps): Promise<FindManyBillsResponse>
	findById(id: string): Promise<Bill | null>
	update(id: string, data: Prisma.BillUncheckedUpdateInput): Promise<Bill>
}
