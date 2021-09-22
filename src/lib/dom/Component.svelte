<script lang="ts">
	import { getBoxes, registerBox } from './boxContext';
	import { getState } from './state';

	const boxes = getBoxes();

	export let id: string;
	export let name: string | undefined = undefined;
	export let small: boolean = false;
	export let classes: string | undefined = undefined;
	export let hidePlaceholder: boolean = false;

	const state = getState(id);
	$: active = $state.type === 'ACTIVE';
</script>

<div class="grid justify-center {classes}">
	{#if !hidePlaceholder}<div>&nbsp;</div>{/if}
	<div
		class="relative p-2 border border-gray-300 bg-white rounded shadow text-center grid grid-flow-col gap-1 justify-center items-center transition-all"
		class:text-xs={small}
		class:bg-brand-light={active}
		class:border-brand-dark={active}
		class:shadow-lg={active}
		class:-translate-y-1={active}
		use:registerBox={{ boxes, id }}
	>
		{#if $$slots.icon}
			<span class="text-gray-400" class:text-brand-dark={active}><slot name="icon" /></span>
		{/if}
		{#if name}{name}{:else}<slot />{/if}
	</div>
</div>
