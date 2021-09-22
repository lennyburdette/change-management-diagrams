<script lang="ts">
	import Document from '$lib/svg/icons/Document.svelte';

	export let codeVersion = 0;
	export let schemaVersion = 0;
	export let deployed = false;
</script>

<div
	class="grid grid-flow-col place-content-center transition-all duration-300 rounded bg-purple-300 p-[1px]"
	class:bg-green-300={deployed ? codeVersion === 1 : false}
	class:bg-blue-300={deployed ? codeVersion === 2 : false}
>
	<Document version={deployed ? schemaVersion : 0} />
</div>
