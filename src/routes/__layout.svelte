<script lang="ts">
	import { page } from '$app/stores';

	const pages = [
		{ name: 'Backward compatible subgraph schema change', path: '/scenarios/backward-compatible' },
		{
			name: 'Gateway logic changes',
			path: '/scenarios/gateway-logic'
		}
	];
</script>

<div class="px-6 py-2 bg-gray-50 border-b shadow">
	<h1 class="text-xl">
		<a href="/">Change management in Apollo Federation</a>
	</h1>
</div>

<div class="container mx-auto grid grid-cols-12">
	<div class="col-span-2 p-6">
		<ul class="text-sm space-y-2">
			{#each pages as { name, path }}
				<li>
					<a
						href={path}
						class="text-gray-700"
						class:font-bold={$page.path === path}
						class:text-gray-900={$page.path === path}>{name}</a
					>
				</li>
			{/each}
		</ul>
	</div>

	<div class="col-span-10 p-6">
		<slot />
	</div>
</div>

<style global lang="postcss">
	@import '@fontsource/source-code-pro';
	@import '@fontsource/source-sans-pro';

	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:root {
		--color-workflow-card-bg: #fff;
		--color-border-primary: rgba(209, 213, 219);
	}
</style>
