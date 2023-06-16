import { container } from 'tsyringe'

import { UsersRepository } from './Repositories/UsersRepository'
import { AccountsRepository } from './Repositories/AccountsRepository'
import { StatementsRepository } from './Repositories/StatementsRepository'

container.registerSingleton<UsersRepository>('UsersRepository', UsersRepository)

container.registerSingleton<AccountsRepository>(
	'AccountsRepository',
	AccountsRepository,
)

container.registerSingleton<StatementsRepository>(
	'StatementsRepository',
	StatementsRepository,
)
