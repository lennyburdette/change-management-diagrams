import preprocess from 'svelte-preprocess';
import yaml from '@rollup/plugin-yaml';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: 'body',

		vite: {
			plugins: [yaml()]
		}
	}
};

export default config;
