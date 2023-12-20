import { Prisma } from '@prisma/client'

import { BillsRepository } from '../bills-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBillsRepository implements BillsRepository {
	async create(data: Prisma.BillUncheckedCreateInput) {
		const bill = await prisma.bill.create({
			data,
		})

		return bill
	}

	async findBillsByUserId(id: string) {
		const bills = await prisma.bill.findMany({
			where: {
				userId: id,
			},
		})

		return bills
	}

	async findById(id: string) {
		const bill = await prisma.bill.findFirst({ where: { id } })

		return bill
	}

	async update(id: string, data: Prisma.BillUncheckedUpdateInput) {
		const bill = await prisma.bill.update({
			where: {
				id,
			},

			data,
		})

		return bill
	}
}
