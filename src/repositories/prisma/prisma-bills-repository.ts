import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { BillsRepository, FindManyBillsProps } from '../bills-repository'

export class PrismaBillsRepository implements BillsRepository {
	async create(data: Prisma.BillUncheckedCreateInput) {
		const bill = await prisma.bill.create({
			data,
		})

		return bill
	}

	async findManyBills({ userId, title, pageIndex }: FindManyBillsProps) {
		const billsResult = await prisma.bill.findMany({
			where: {
				title: {
					contains: title,
				},
				userId,
			},
			take: 10,
			skip: pageIndex * 10,
		})

		const billsCount = await prisma.bill.count({
			where: {
				title: {
					contains: title,
				},
				userId,
			},
		})

		const bills = billsResult.map((bill) => {
			return Object.assign(bill, {
				amount: undefined,
				amountInCents: bill.amount,
				userId: undefined,
			})
		})

		return { bills, billsCount }
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
