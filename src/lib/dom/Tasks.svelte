<script lang="ts">
	import type { Task } from '$lib/types';

	import Step from './Step.svelte';
	// export let title = 'Software Development Life Cycle';
	export let tasks: Task[][] = [];

	$: max = Math.max(...tasks.map((s) => s.length));
</script>

<div class="p-2 border rounded-lg">
	<!-- <p class="mb-2">{title}</p> -->
	<div class="grid grid-flow-col grid-rows-2 gap-2 text-xs">
		{#each tasks as col, columnIndex}
			{#each col as step}
				<Step {...step} terminal={columnIndex === tasks.length - 1} />
			{/each}
			{#each new Array(max - col.length) as _}
				<div />
			{/each}
		{/each}
	</div>
</div>
