export class UserAlreadyExistsError extends Error {
	constructor() {
		super('Usuário já existente')
		this.name = 'UserAlreadyExistsError'
	}
}
