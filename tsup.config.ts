import { defineConfig } from 'tsup'

// export const tsup: Options = {
// 	entry: ['./src/**/*.ts', '!./src/**/*.spec.ts'],
// }

export default defineConfig({
	entry: ['./src/**/*.ts', '!./src/**/*.spec.ts'],
	outDir: './build',
})
