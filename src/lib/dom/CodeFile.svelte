<script>
  import { each } from 'svelte/internal';
</script>

<div class="border border-gray-100 rounded-lg bg-white shadow-lg">
  <div class="border-b p-3 px-5">
    <h1 class="text-3xl"><slot name="title" /></h1>
  </div>
  <div class="p-5 flex">
    <div class="relative w-8 mr-3 text-gray-200 text-2xl font-mono overflow-hidden">
      <div class="absolute top-[2px]">
        {#each new Array(40).fill(1) as _, i}
          {i} <br />
        {/each}
      </div>
    </div>
    <div><slot /></div>
  </div>
</div>
