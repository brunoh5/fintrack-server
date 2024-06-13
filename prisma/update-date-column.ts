import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateDateColumn() {
	try {
		const updatedRecords = await prisma.transaction.updateMany({
			data: {
				date: new Date(String(prisma.transaction.fields.created_at)),
			},
			where: {
				date: undefined,
			},
		})

		console.log(`Updated ${updatedRecords.count} records.`)
	} catch (error) {
		console.error('Error updating date column:', error)
	} finally {
		await prisma.$disconnect()
	}
}

updateDateColumn()
