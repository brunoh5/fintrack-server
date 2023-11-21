import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface PayloadProps {
	sub: string
}

export async function verifyJWT(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	const [, token] = authHeader.split(' ')

	try {
		const { sub: userId } = verify(token, env.SECRET_TOKEN) as PayloadProps

		req.user = {
			sub: userId,
		}

		next()
	} catch {
		return res.status(401).json({ message: 'Unauthorized' })
	}
}
