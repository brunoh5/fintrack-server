import { Bill, Prisma } from '@prisma/client'

export interface BillsRepository {
	create(data: Prisma.BillUncheckedCreateInput): Promise<Bill>
	findBillsByUserId(id: string): Promise<Bill[]>
	findById(id: string): Promise<Bill>
	update(data: Prisma.BillUncheckedUpdateInput): Promise<Bill>
}
