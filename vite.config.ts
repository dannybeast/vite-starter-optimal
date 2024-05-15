import { defineConfig } from 'vite';
import vituum from 'vituum';
import twig from '@vituum/vite-plugin-twig';
import path from 'node:path';
import dataSite from './src/data/site';
import { listHtml, getFileName } from './src/data/app.config';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';



export default defineConfig({
	plugins: [
		vituum({
			pages: {
				dir: './src/views'
			},
			imports: {
				paths: []
			}
		}),
		twig({
			root: './src',
			globals: {
				site: dataSite,
			},
			functions: {
				listHtml: () => listHtml,
			},
		}),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), 'src','assets', 'icons')],
			symbolId: 'icon-[name]',
			inject: 'body-last',
			customDomId: '__svg__icons__dom__',
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(process.cwd(), 'src'),
			'scripts': path.resolve(process.cwd(), 'src', 'scripts'),
			'styles': path.resolve(process.cwd(), 'src', 'styles'),
		},
	},
	build: {
		manifest: false,
		assetsInlineLimit: 0,
		modulePreload: false,
		rollupOptions: {
			input: [
				'./src/views/**/*.{json,twig,html}',
				'!./src/views/**/*.twig.json',
				'./src/scripts/*.{js,ts,mjs}'
			],
			output: {
				entryFileNames: 'assets/js/[name].js',
				chunkFileNames: 'assets/js/[name].js',
				assetFileNames: getFileName,
			},
		},
	},
});
