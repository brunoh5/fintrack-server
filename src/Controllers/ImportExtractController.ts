import { Request, Response } from 'express'
import fs from 'fs'
import csvParse from 'csv-parse'
import { AppError } from '@/AppError'
import { prisma } from '@/lib/prisma'

interface TransactionProps {
	createdAt: Date
	amount: number
	description: string
}

export class ImportExtractController {
	// eslint-disable-next-line no-undef
	loadTransactions(file: Express.Multer.File): Promise<TransactionProps[]> {
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(file.path)
			const transactions: TransactionProps[] = []

			const parseFile = csvParse()

			stream.pipe(parseFile)

			parseFile
				.on('data', async (line: any) => {
					const [date, amount, , description] = line

					console.log(description.split('-'))

					transactions.push({
						createdAt: new Date(date),
						amount,
						description,
					})
				})
				.on('end', () => {
					fs.promises.unlink(file.path)
					resolve(transactions)
				})
				.on('error', (err: any) => {
					reject(err)
				})
		})
	}

	async handle(req: Request, res: Response): Promise<Response> {
		const { file } = req
		const { id } = req.user
		const { accountId } = req.body

		if (!file) {
			throw new AppError(`> File doesn't exists`)
		}

		const transactions = await this.loadTransactions(file)

		transactions.map(async (transaction) => {
			await prisma.transactions.create({
				data: {
					...transaction,
					userId: id,
					accountId,
					shopName: 'a',
					name: 'b',
				},
			})
		})

		return res.status(204).json()
	}
}
