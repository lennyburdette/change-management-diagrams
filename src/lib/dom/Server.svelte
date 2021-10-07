<script context="module">
  export const COLORS = ['bg-purple-300', 'bg-green-300', 'bg-blue-300', 'bg-pink-300'];
</script>

<script lang="ts">
  import Document from '$lib/svg/icons/Document.svelte';

  export let code: number;
  export let schema: string;
</script>

<div
  class={`relative grid grid-flow-col place-content-center transition-all duration-300 rounded p-[1px] ${COLORS[code]}`}
>
  <Document version={schema} />
</div>
