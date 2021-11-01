<script lang="ts">
  import Particle from './Particle.svelte';
  import { getState } from '$lib/dom/state';

  const state = getState('hooray');

  $: visible = $state.type === 'ACTIVE';
  $: count = visible ? 100 : 0;
  $: arr = new Array(count).fill(1);
</script>

{#if visible}
  <div class="z-[1000] fixed w-full h-full">
    {#each arr as _}<Particle />{/each}
  </div>
{/if}
