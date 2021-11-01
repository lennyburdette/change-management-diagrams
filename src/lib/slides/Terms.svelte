<script lang="ts">
  export let step: number = 0;
</script>

<div
  class="absolute inset-0 bg-gradient-to-tr from-purple-900 to-blue-300 grid place-content-center"
>
  <div class="mx-28 font-bold text-white">
    <ul class="list-disc text-7xl space-y-8">
      <li class="opacity-0 transition-all" class:opacity-100={step >= 1}>Apollo Studio</li>
      <li class="opacity-0 transition-all" class:opacity-100={step >= 2}>Managed Federation</li>
      <li class="opacity-0 transition-all" class:opacity-100={step >= 3}>Router</li>
      <li class="opacity-0 transition-all" class:opacity-100={step >= 4}>Subgraph</li>
      <li class="opacity-0 transition-all" class:opacity-100={step >= 5}>
        Subgraph Check & Publish
      </li>
      <li class="opacity-0 transition-all" class:opacity-100={step >= 6}>Rover</li>
    </ul>
  </div>
</div>
