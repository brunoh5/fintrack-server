import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	const isCategoriesAlreadyExists = await prisma.category.findFirst({
		where: { name: 'Casa' },
	})

	if (!isCategoriesAlreadyExists) {
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

		console.info('> Categories created')
	}

	const isAdminUserAlreadyExists = await prisma.user.findFirst({
		where: { email: 'admin@fintracer.com.br' },
	})

	if (!isAdminUserAlreadyExists) {
		await prisma.user.create({
			data: {
				name: 'Admin',
				email: 'admin@fintracer.com.br',
				password_hash: await hash('123456', 6),
			},
		})

		console.info('> Admin user Created')
	}
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
