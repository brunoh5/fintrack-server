import { Request, Response } from 'express'

import { AppError } from '@/AppError'
import { prisma } from '@/lib/prisma'

class CreateAccountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, balance, type, bank } = req.body
    const userId = req.headers.authorization

    if (!userId) {
      throw new AppError('> You must be logged in', 401)
    }

    const account = await prisma.accounts.create({
      data: {
        userId,
        name,
        description,
        balance,
        type,
        bank,
      },
    })

    return res.status(201).json(account)
  }
}

export { CreateAccountController }
