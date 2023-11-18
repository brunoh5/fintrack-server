import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from './AppError'
import { env } from './env'

interface PayloadProps {
	sub: string
}

export async function ensureAuthenticated(
	req: Request,
	_: Response,
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
			String(env.SECRET_TOKEN),
		) as PayloadProps

		req.user = {
			id: userId,
		}

		next()
	} catch {
		throw new AppError('Invalid Token', 401)
	}
}
