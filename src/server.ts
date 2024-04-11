import { app } from './app'
import { env } from './env'

app.listen(env.PORT, () => {
	console.info(`Server running on http://localhost:${env.PORT}`)
})
