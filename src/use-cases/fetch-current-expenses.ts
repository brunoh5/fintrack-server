import { TransactionsRepository } from '@/repositories/transactions-repository'

interface FetchCurrentExpensesUseCaseRequest {
	userId: string
}

type Transaction = {
	month: number
	total: number
	category: string | undefined
}

type Metrics = {
	[key: string]: {
		transactions: Transaction[]
		diffBetweenMonth: number
	}
}

export class FetchCurrentExpenses {
	constructor(private transactionsRepository: TransactionsRepository) {}

	async execute({ userId }: FetchCurrentExpensesUseCaseRequest) {
		const currentExpenses =
			await this.transactionsRepository.expensesCompareWithLastMonth(userId)

		if (currentExpenses === null) {
			return null
		}

		const newExpenses = currentExpenses.reduce((acc: Metrics, item) => {
			if (!acc[item.category]) {
				acc[item.category] = {
					transactions: [],
					diffBetweenMonth: 0,
				}
			}

			const currentMonth = item.transactions[0] || {
				month: null,
				total: 0,
			}

			const lastMonth = item.transactions[1] || {
				month: null,
				total: 0,
			}

			acc[item.category].transactions.push(
				Object.assign(currentMonth, {
					category: undefined,
				}),
			)
			acc[item.category].transactions.push(
				Object.assign(lastMonth, {
					category: undefined,
				}),
			)

			const absoluteDiff = currentMonth.total - lastMonth.total
			const average = (currentMonth.total + lastMonth.total) / 2
			const monthlyDiffInPercentage = (100 * absoluteDiff) / average

			acc[item.category].diffBetweenMonth = Math.floor(monthlyDiffInPercentage)

			return acc
		}, {})

		return newExpenses
	}
}
