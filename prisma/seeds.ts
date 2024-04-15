import { faker } from '@faker-js/faker'
import { $Enums, PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

import { env } from '@/env'

const prisma = new PrismaClient()

async function main() {
	/** Reset database */
	await prisma.$executeRaw`DELETE FROM users`
	await prisma.$executeRaw`DELETE FROM accounts`
	await prisma.$executeRaw`DELETE FROM transactions`
	await prisma.$executeRaw`DELETE FROM bills`
	await prisma.$executeRaw`DELETE FROM goals`

	const { id: userId } = await prisma.user.create({
		data: {
			name: faker.person.fullName(),
			email: 'bruno@fintracer.com.br',
			password_hash: await hash('123456', 6),
		},
	})

	const { id: accountId } = await prisma.account.create({
		data: {
			bank: faker.finance.accountName(),
			balance: Number(faker.finance.accountNumber(5)),
			type: 'CURRENT_ACCOUNT',
			userId,
			number: faker.finance.accountNumber(16),
		},
	})

	const transactionsToInsert: any[] = []
	const billsToInsert: any[] = []

	for (let i = 0; i < 40; i++) {
		const transaction_type = faker.helpers.arrayElement([
			'CREDIT',
			'DEBIT',
		]) as $Enums.TransactionType

		const amount =
			transaction_type === 'DEBIT'
				? Number(
						faker.commerce.price({
							min: 500,
							max: 5000,
							dec: 0,
						}),
					) * -1
				: Number(
						faker.commerce.price({
							min: 500,
							max: 5000,
							dec: 0,
						}),
					)

		transactionsToInsert.push({
			accountId,
			userId,
			name: faker.commerce.productName(),
			shopName: faker.company.name(),
			amount,
			transaction_type,
			category: faker.helpers.arrayElement([
				'ENTERTAINMENT',
				'FOOD',
				'OTHERS',
				'TRANSPORTATION',
				'HOME',
				'SHOPPING',
			]),
			payment_method: faker.helpers.arrayElement([
				'PIX',
				'BANK_TRANSFER',
				'CREDIT_CARD',
				'DEBIT_CARD',
				'MONEY',
			]),
			created_at: faker.date.recent({
				days: 365,
			}),
		})
	}

	for (let i = 0; i < 15; i++) {
		const amount = Number(
			faker.commerce.price({
				min: 500,
				max: 5000,
				dec: 0,
			}),
		)

		billsToInsert.push({
			userId,
			title: faker.company.name(),
			description: faker.commerce.productDescription(),
			amount,
			period: faker.helpers.arrayElement(['ONLY', 'MONTHLY', 'ANUAL']),
			dueDate: faker.date.future({
				years: 1,
			}),
			created_at: faker.date.recent({
				days: 365,
			}),
		})
	}

	await prisma.transaction.createMany({
		data: transactionsToInsert,
	})

	await prisma.bill.createMany({
		data: billsToInsert,
	})
}

if (env.NODE_ENV !== 'production') {
	main()
		.then(async () => {
			await prisma.$disconnect()
		})
		.catch(async (e) => {
			console.error(e)
			await prisma.$disconnect()
			process.exit(1)
		})
}
