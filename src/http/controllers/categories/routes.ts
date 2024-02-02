import { Router } from 'express'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { fetch } from './fetch'
import { fetchMetrics } from './fetch-metrics'
import { get } from './get'

const categoriesRouter = Router()

categoriesRouter.use(verifyJWT)

categoriesRouter.get('/categories', fetch)
categoriesRouter.get('/categories/:id', get)
categoriesRouter.get('/categories/metrics', fetchMetrics)

export { categoriesRouter }
