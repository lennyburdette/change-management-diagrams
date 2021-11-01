<script lang="ts">
  import Step from '$lib/dom/Step.svelte';

  import SCRIPT from '$lib/presentation.yaml';
  import { onMount } from 'svelte';

  $: index = 0;
  $: nodes[index]?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

  onMount(() => {
    window.addEventListener('message', ({ data }) => {
      console.log(data);
      index = data.index;
    });
    window.opener.postMessage('refresh');
  });

  function listener(e) {
    if (e.key === 'n' || e.key === ' ' || e.key === 'ArrowRight') {
      window.opener.postMessage('next');
    } else if (e.key === 'p' || e.key === 'Backspace' || e.key === 'ArrowLeft') {
      window.opener.postMessage('prev');
    }
  }

  const nodes = [];
</script>

<svelte:window on:keydown={listener} />

<div class="p-4">
  {#each SCRIPT.steps as { notes, duration }, i}
    {#if notes}
      <div
        bind:this={nodes[i]}
        class="text-3xl text-black text-opacity-40 pb-4 max-w-prose"
        class:text-opacity-100={i === index}
        class:text-red-900={!!duration}
      >
        {@html notes.split(/[\t\n]{2,}/).join('<br><br>')}
      </div>
    {:else}
      <div
        bind:this={nodes[i]}
        class="inline-block w-5 h-5 rounded-full mr-4 mb-2 bg-black bg-opacity-30"
        class:bg-opacity-100={i === index}
        class:bg-red-900={!!duration}
      />
    {/if}
  {/each}
</div>

<slot />
