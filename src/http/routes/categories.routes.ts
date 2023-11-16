import { Router } from 'express'

import { CategoriesController } from '@/Controllers/CategoriesController'

const categoriesRouter = Router()

const categoriesController = new CategoriesController()

categoriesRouter.get('/', categoriesController.listAll)
categoriesRouter.get('/:id', categoriesController.list)

export { categoriesRouter }
