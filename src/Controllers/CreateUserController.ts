import { Request, Response } from 'express'
import { hash } from 'bcryptjs'

import { prisma } from '../lib/prisma'
import { AppError } from '../AppError'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    try {
      const passwordHash = await hash(password, 8)

      const user = await prisma.users.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      })

      return res.status(201).json(user)
    } catch {
      throw new AppError('> Erro')
    }
  }
}

export { CreateUserController }
