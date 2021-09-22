module.exports = {
	mode: 'jit',
	// you dont need `purge: enabled: production` because you are using jit
	purge: [
		'./src/**/*.svelte',
		// may also want to include HTML files
		'./src/**/*.html'
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Source Sans Pro', 'system-ui', 'sans-serif'],
				mono: ['Source Code Pro', 'monospace']
			},
			colors: {
				brand: {
					DEFAULT: '#391E8A',
					light: '#EBE6EE',
					dark: '#391E8A'
				}
			},
			borderWidth: {
				DEFAULT: '0.5px'
			},
			backgroundImage: {
				halfSplit: `linear-gradient(
					90deg,
					var(--color-workflow-card-bg) 0%,
					var(--color-workflow-card-bg) 50%,
					var(--color-border-primary) 50%,
					var(--color-border-primary) 100%
				)`
			}
		}
	},
	variants: {},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-hero-patterns')]
};
