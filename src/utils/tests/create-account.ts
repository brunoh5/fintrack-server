import { verify } from 'jsonwebtoken'

import { env } from '@/env'
import { prisma } from '@/lib/prisma'

interface PayloadProps {
	sub: string
}

export async function createAccount(token: string) {
	const { sub: userId } = verify(token, env.JWT_SECRET) as PayloadProps

	const account = await prisma.account.create({
		data: {
			userId,
			bank: 'bank-01',
			type: 'CURRENT_ACCOUNT',
			number: '1111 2222 3333 4444',
			balance: 3500,
		},
	})

	return {
		account,
	}
}
