// import { Request, Response } from 'express'
// import fs from 'fs'
// import { parse } from 'csv-parse'
// import { AppError } from '@/AppError'
// import { prisma } from '@/lib/prisma'

// interface TransactionProps {
// 	createdAt: Date
// 	amount: number
// 	description: string
// }

// export class ImportExtractController {
// 	loadTransactions(file: Express.Multer.File): Promise<TransactionProps[]> {
// 		return new Promise((resolve, reject) => {
// 			// const stream = fs.createReadStream(file.path)
// 			// const transactions: TransactionProps[] = []

// 			// const parseFile = csvParse()

// 			// stream.pipe(parseFile)

// 			// parseFile
// 			// 	.on('data', async (line: any) => {
// 			// 		const [date, amount, , description] = line

// 			// 		transactions.push({
// 			// 			createdAt: new Date(date),
// 			// 			amount,
// 			// 			description,
// 			// 		})
// 			// 	})
// 			// 	.on('end', () => {
// 			// 		fs.promises.unlink(file.path)
// 			// 		resolve(transactions)
// 			// 	})
// 			// 	.on('error', (err: any) => {
// 			// 		reject(err)
// 			// 	})

// 			const transactions: TransactionProps[] = []

// 			fs.createReadStream(file.path)
// 				.pipe(parse({ delimiter: '', from_line: 2 }))
// 				.on('data', (row) => {
// 					console.log(row)
// 				})
// 				.on('end', () => {
// 					console.log('finished')
// 					resolve(transactions)
// 				})
// 				.on('error', (error) => {
// 					reject(error)
// 				})
// 		})
// 	}

// 	async handle(req: Request, res: Response): Promise<Response> {
// 		const { file } = req
// 		const { id } = req.user
// 		const { accountId } = req.params

// 		if (!file) {
// 			throw new AppError(`> File doesn't exists`)
// 		}

// 		const account = await prisma.account.findFirst({
// 			where: { id: accountId },
// 			select: { id: true, balance: true },
// 		})

// 		if (!account) {
// 			throw new AppError(`> This account doesn't exist`)
// 		}

// 		const transactions = await this.loadTransactions(file)

// 		transactions.map(async (transaction) => {
// 			const createTransaction = prisma.transaction.create({
// 				data: {
// 					...transaction,
// 					userId: id,
// 					accountId: account.id,
// 					shopName: 'a',
// 					name: 'b',
// 				},
// 			})

// 			const updateBalance = prisma.account.update({
// 				where: { id: account.id },
// 				data: {
// 					balance: Number(account.balance) + transaction.amount,
// 				},
// 			})

// 			await prisma.$transaction([createTransaction, updateBalance])
// 		})

// 		return res.status(204).json()
// 	}
// }
