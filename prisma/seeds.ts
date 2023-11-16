import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	await prisma.category.createMany({
		data: [
			{ name: 'Casa' },
			{ name: 'Alimentação' },
			{ name: 'Transporte' },
			{ name: 'Entretenimento' },
			{ name: 'Shopping' },
			{ name: 'Outros' },
		],
	})

	const password = await hash('12345', 6)

	await prisma.user.create({
		data: {
			name: 'Admin',
			email: 'admin@fintrack.com',
			password_hash: password,
		},
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
