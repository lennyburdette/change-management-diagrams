<script lang="ts">
  import { fly, scale } from 'svelte/transition';

  import { getState } from '$lib/dom/state';
  import { backOut, bounceOut, elasticOut } from 'svelte/easing';

  export let id;
  const state = getState(id);

  $: visible = $state.type !== 'HIDE';
</script>

{#if visible}
  <div
    in:scale={{ easing: backOut, duration: 500 }}
    out:fly
    class:opacity-50={$state.type === 'DIMMED'}
  >
    <slot />
  </div>
{/if}
