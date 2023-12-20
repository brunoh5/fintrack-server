import { Bill, Prisma } from '@prisma/client'

export interface BillsRepository {
	create(data: Prisma.BillUncheckedCreateInput): Promise<Bill>
	findBillsByUserId(id: string): Promise<Bill[]>
	findById(id: string): Promise<Bill | null>
	update(id: string, data: Prisma.BillUncheckedUpdateInput): Promise<Bill>
}
