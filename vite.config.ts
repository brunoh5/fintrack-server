import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
		dir: 'src',
		exclude: [
			'**/node_modules/**',
			'**/build/**',
			'**/.{idea,git,cache,output,temp}/**',
			'./src/error-handler.ts',
			'./prisma/seeds.ts',
		],
	},
})
