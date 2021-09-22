/// <reference types="@sveltejs/kit" />

declare module '*.yaml' {
	const script: import('$lib/types').Script;
	export default script;
}
