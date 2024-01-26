import { Request, Response } from 'express'
import { z } from 'zod'

import { makeEditUserUseCase } from '@/use-cases/factories/makeEditUserUseCase'

export async function edit(req: Request, res: Response) {
	const { sub: userId } = req.user

	const editUserBodySchema = z.object({
		current_password: z.string(),
		new_password: z.string(),
	})

	const { current_password, new_password } = editUserBodySchema.parse(req.body)

	const editUser = makeEditUserUseCase()

	await editUser.execute({
		userId,
		current_password,
		new_password,
	})

	return res.status(204)
}
