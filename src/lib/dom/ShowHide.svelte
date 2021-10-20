<script lang="ts">
  import { fly, scale } from 'svelte/transition';

  import { getState } from '$lib/dom/state';
  import { bounceOut, elasticOut } from 'svelte/easing';

  export let id;
  const state = getState(id);

  $: visible = $state.type !== 'HIDE';
</script>

{#if visible}
  <div in:scale={{ easing: elasticOut, duration: 1000 }} out:fly><slot /></div>
{/if}
