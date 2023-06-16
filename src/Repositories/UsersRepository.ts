import { prisma } from '@/lib/prisma'
import { injectable } from 'tsyringe'

interface UserProps {
	name: string
	email: string
	password: string
}

@injectable()
class UsersRepository {
	async create({ name, email, password }: UserProps) {
		const user = await prisma.users.create({
			data: {
				name,
				email,
				password,
				accounts: {
					create: {
						name: 'Conta Inicial',
						type: 'outros',
					},
				},
			},
		})

		return user
	}

	async findByEmail(email: string) {
		const user = await prisma.users.findFirst({
			where: {
				email,
			},
		})

		return user
	}

	async findById(id: string) {
		const user = await prisma.users.findFirst({
			where: {
				id,
			},
		})

		return user
	}
}

export { UsersRepository }
