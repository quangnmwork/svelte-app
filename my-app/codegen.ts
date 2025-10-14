import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'http://localhost:4000/graphql',
	documents: ['./src/lib/api/query.ts', './src/**/*.{svelte,ts}'],
	ignoreNoDocuments: true,
	generates: {
		'./src/lib/gql/': {
			preset: 'client',
			plugins: [
				{
					add: {
						content: '// @ts-nocheck\n'
					}
				},
				'typescript'
			],
			presetConfig: {
				fragmentMasking: false
			},
			config: {
				scalars: {
					Date: 'string'
				},
				documentMode: 'string',
				useTypeImports: true
			}
		}
	}
};
export default config;
