import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: (response, path) => {
				if (response.status === 405) {
					// Ignore 405 errors (Method Not Allowed)
					return { body: '', status: 200 };
				}
				// For other page errors, allow the error to be thrown
				return false;
			}
		}
	}
};

export default config;
