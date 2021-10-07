<script lang="ts">
  import Document from '$lib/svg/icons/Document.svelte';
  import { fade } from 'svelte/transition';

  import { COLORS } from './Server.svelte';

  export let show = false;
</script>

<div class="relative">
  <button on:click={() => (show = !show)}>Legend</button>

  {#if show}
    <div
      transition:fade={{ duration: 100 }}
      class="fixed inset-0 z-10"
      on:click={() => (show = false)}
    />
    <div
      transition:fade={{ duration: 100 }}
      class="absolute -right-2 top-6 w-80 bg-white border rounded-lg p-4 shadow-lg grid grid-cols-2 gap-2 z-20"
    >
      <div class="flex space-x-1">
        <div class={`w-5 h-5 rounded ${COLORS[0]}`} />
        <div class={`w-5 h-5 rounded ${COLORS[1]}`} />
        <div class={`w-5 h-5 rounded ${COLORS[2]}`} />
      </div>
      <div>Code Version</div>
      <div class="flex">
        <div class="relative"><Document version="X" /></div>
        <div class="relative">
          <Document version="Y" />
        </div>
        <div class="relative">
          <Document version="XY" />
        </div>
      </div>
      <div>Schema Version</div>
    </div>
  {/if}
</div>
