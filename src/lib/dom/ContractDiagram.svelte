<script>
  import Document from '$lib/svg/icons/Document.svelte';
  import Filter from '$lib/svg/icons/Filter.svelte';
  import { onMount } from 'svelte';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

  export let state;
  let i = 0;

  onMount(() => {
    setTimeout(() => i++, 200);
    setTimeout(() => i++, 300);
    setTimeout(() => i++, 400);
    setTimeout(() => i++, 500);
    setTimeout(() => i++, 600);
  });
</script>

<div class="flex items-center">
  <div class="w-[40px] h-[40px]">
    {#if i >= 1}<div in:scale={{ easing: backOut }}><Document version={state?.a} /></div>{/if}
  </div>

  {#if i >= 2}<div in:scale={{ easing: backOut }}>+</div>{/if}

  <div class="w-[40px] h-[40px] grid place-content-center">
    {#if i >= 3}<div in:scale={{ easing: backOut }}><Filter /></div>{/if}
  </div>

  {#if i >= 2}<div in:scale={{ easing: backOut }}>=</div>{/if}

  <div class="w-[40px] h-[40px]">
    {#if i >= 5}
      <div in:scale={{ easing: backOut }}>
        <Document version={state?.c} />
      </div>
    {/if}
  </div>
</div>
