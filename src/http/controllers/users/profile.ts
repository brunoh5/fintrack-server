import { makeGetUserProfileUseCase } from '@/use-cases/factories/makeGetUserProfileUseCase'
import { Request, Response } from 'express'

export async function profile(req: Request, res: Response) {
	const getUserProfile = makeGetUserProfileUseCase()

	const { user } = await getUserProfile.execute({
		userId: req.user.sub,
	})

	return res.status(200).json({
		user: {
			...user,
			password_hash: undefined,
		},
	})
}
