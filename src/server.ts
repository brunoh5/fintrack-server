import { app } from './app'
import { env } from './env'

app.listen(env.PORT, () => console.info('> HTTP Server running'))
