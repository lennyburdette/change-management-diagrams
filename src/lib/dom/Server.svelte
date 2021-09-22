<script context="module">
  export const COLORS = ['bg-purple-400', 'bg-green-400', 'bg-blue-400', 'bg-pink-400'];
</script>

<script lang="ts">
  import Document from '$lib/svg/icons/Document.svelte';

  export let code;
  export let schema: string;
</script>

<div
  class={`relative grid grid-flow-col place-content-center transition-all duration-300 rounded p-[1px] ${COLORS[code]}`}
>
  <Document version={schema} />
</div>
