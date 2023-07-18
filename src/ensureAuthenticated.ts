import { NextFunction, Request, Response } from 'express'
import { AppError } from './AppError'
import { verify } from 'jsonwebtoken'

interface PayloadProps {
	sub: string
}

export async function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		throw new AppError('Token missing', 401)
	}

	const [, token] = authHeader.split(' ')

	try {
		const { sub: userId } = verify(
			token,
			String(process.env.SECRET_TOKEN),
		) as PayloadProps

		req.user = {
			id: userId,
		}

		next()
	} catch {
		throw new AppError('Invalid Token', 401)
	}
}
