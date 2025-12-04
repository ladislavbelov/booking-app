import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		laravel({
			input: ['resources/css/app.css', 'resources/js/app.ts'],
			refresh: [
				'resources/views/**/*.blade.php',
				'app/**/*.php',
				'routes/**/*.php',
				'resources/js/**/*.ts',
				'resources/js/**/*.vue',
				'resources/js/**/*.js',
				'resources/css/**/*.css',
			],
		}),
		vue({
			template: {
				transformAssetUrls: {
					base: null,
					includeAbsolute: false,
				},
			},
		}),
		tailwindcss(),
	],
	publicDir: 'public',

	resolve: {
		alias: {
			'@': '/resources/js',
		},

		extensions: ['.ts', '.js', '.vue', '.json'],
	},

	server: {
		host: 'localhost',
		port: 5173,
		hmr: {
			host: 'localhost',
			protocol: 'ws',
		},
		watch: {
			usePolling: true,
			interval: 100,
		},
	},

	optimizeDeps: {
		include: ['vue'],
		entries: ['resources/js/**/*.ts', 'resources/js/**/*.vue'],
	},
});
