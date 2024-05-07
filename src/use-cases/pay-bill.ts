import { AccountsRepository } from '@/repositories/accounts-repository'
import { BillsRepository } from '@/repositories/bills-repository'
import { TransactionsRepository } from '@/repositories/transactions-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface PayBillUseCaseRequest {
	billId: string
	accountId: string
	userId: string
	paid_at: Date | string
	paidAmount?: number
}

export class PayBillUseCase {
	constructor(
		private billsRepository: BillsRepository,
		private accountsRepository: AccountsRepository,
		private transactionsRepository: TransactionsRepository,
	) {}

	async execute({
		billId,
		accountId,
		userId,
		paid_at,
		paidAmount,
	}: PayBillUseCaseRequest) {
		const bill = await this.billsRepository.findById(billId)

		if (!bill) {
			throw new ResourceNotFoundError()
		}

		Object.assign(bill, {
			paidAmount,
			paid_at,
			accountId,
		})

		await this.accountsRepository.updateBalanceAccount({
			id: accountId,
			amount: paidAmount ?? bill.amount,
			type: 'DEBIT',
		})

		await this.transactionsRepository.create({
			name: `Conta Paga: ${bill.title}`,
			accountId,
			userId,
			amount: paidAmount ?? bill.amount,
		})

		await this.billsRepository.update(billId, bill)
	}
}
